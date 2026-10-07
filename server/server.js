var express = require("express");
var cors = require("cors");
var fs = require("fs");
var path = require("path");

var app = express();
app.use(cors());
app.use(express.json());

var DATA_DIR = path.join(__dirname, "data");
var TABS = ["projects", "dbinfo", "wikilinks", "tickets"];
var PORT = process.env.PORT || 4000;

function filePath(tab){
  return path.join(DATA_DIR, tab + ".json");
}

// Synchronous fs calls are used deliberately: Node is single-threaded and
// readFileSync/writeFileSync never yield to the event loop mid-call, so two
// requests can never interleave a read and a write on the same file here.
function readTab(tab){
  var raw = fs.existsSync(filePath(tab)) ? fs.readFileSync(filePath(tab), "utf8") : "[]";
  var rows = JSON.parse(raw || "[]");
  var maxId = 0;
  rows.forEach(function(r){ if (typeof r.id === "number" && r.id > maxId) maxId = r.id; });
  var changed = false;
  rows.forEach(function(r){
    if (typeof r.id !== "number"){ r.id = ++maxId; changed = true; }
    if (typeof r._deleted !== "boolean"){ r._deleted = false; changed = true; }
  });
  if (changed) writeTab(tab, rows);
  return rows;
}

function writeTab(tab, rows){
  fs.mkdirSync(DATA_DIR, {recursive: true});
  fs.writeFileSync(filePath(tab), JSON.stringify(rows, null, 2) + "\n", "utf8");
}

function requireValidTab(req, res, next){
  if (TABS.indexOf(req.params.tab) === -1) return res.status(400).json({error: "unknown tab"});
  next();
}

app.get("/api/:tab", requireValidTab, function(req, res){
  try{
    res.json(readTab(req.params.tab));
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

app.post("/api/:tab", requireValidTab, function(req, res){
  try{
    var rows = readTab(req.params.tab);
    var nextId = rows.reduce(function(m, r){ return Math.max(m, r.id); }, 0) + 1;
    var row = Object.assign({}, req.body, {id: nextId, _deleted: false});
    rows.push(row);
    writeTab(req.params.tab, rows);
    res.status(201).json(row);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

app.put("/api/:tab/:id", requireValidTab, function(req, res){
  try{
    var rows = readTab(req.params.tab);
    var id = Number(req.params.id);
    var row = rows.find(function(r){ return r.id === id; });
    if (!row) return res.status(404).json({error: "not found"});
    Object.assign(row, req.body, {id: row.id, _deleted: row._deleted});
    writeTab(req.params.tab, rows);
    res.json(row);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

app.delete("/api/:tab/:id", requireValidTab, function(req, res){
  try{
    var rows = readTab(req.params.tab);
    var id = Number(req.params.id);
    var row = rows.find(function(r){ return r.id === id; });
    if (!row) return res.status(404).json({error: "not found"});
    row._deleted = true;
    writeTab(req.params.tab, rows);
    res.json(row);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

app.get("/", function(req, res){
  res.json({ok: true, service: "claims-hub-server", tabs: TABS});
});

app.listen(PORT, function(){
  console.log("Claims Hub API listening on http://localhost:" + PORT);
});
