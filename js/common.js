(function(){
  "use strict";

  var STORAGE_PREFIX = "claimsHub.";

  var ICONS = {
    projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    dbinfo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>',
    wikilinks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    tickets: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    chevLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
  };

  // Each tab's own config lives in js/tabs/<id>.js and registers itself
  // into window.TAB_CONFIGS before this file runs.
  var TABS = window.TAB_CONFIGS || [];

  var SCHEMAS = {};
  TABS.forEach(function(t){ SCHEMAS[t.id] = t; });

  var state = {};
  var searchText = {};
  var sortState = {};  // tab -> {key, dir}
  var pageState = {};  // tab -> {page, size}
  var modal = {tab:null, idx:null};
  var pendingDelete = null;

  TABS.forEach(function(t){
    searchText[t.id] = "";
    sortState[t.id] = {key:null, dir:1};
    pageState[t.id] = {page:1, size:50};
  });

  // ---------- GitHub-backed persistence ----------

  function getSettings(){
    var defaults = {owner:"bansari-embrace", repo:"claimsInfo", branch:"main", token:""};
    try{
      var raw = localStorage.getItem(STORAGE_PREFIX + "ghSettings");
      if (raw) return Object.assign(defaults, JSON.parse(raw));
    }catch(e){}
    return defaults;
  }

  function saveSettings(s){
    try{ localStorage.setItem(STORAGE_PREFIX + "ghSettings", JSON.stringify(s)); }catch(e){}
  }

  function ghHeaders(token){
    var h = {"Accept": "application/vnd.github+json"};
    if (token) h["Authorization"] = "token " + token;
    return h;
  }

  function contentsUrl(tab, settings){
    return "https://api.github.com/repos/" + settings.owner + "/" + settings.repo + "/contents/data/" + tab + ".json";
  }

  function utf8ToBase64(str){
    var bytes = new TextEncoder().encode(str);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  var ACTION_GERUND = {add:"Saving…", update:"Updating…", delete:"Deleting…"};
  var ACTION_DONE = {add:"Saved successfully", update:"Updated successfully", delete:"Deleted successfully"};
  var ACTION_VERB = {add:"Save", update:"Update", delete:"Delete"};

  function setSyncStatus(tab, mode, detail, action){
    var el = document.getElementById("sync-" + tab);
    if (!el) return;
    var map = {
      idle:    {cls:"", text:""},
      offline: {cls:"", text:"Not connected — click the gear icon to enable saving"},
      saving:  {cls:"status-progress", text: ACTION_GERUND[action] || "Saving…"},
      saved:   {cls:"status-done", text: ACTION_DONE[action] || "Saved successfully"},
      error:   {cls:"status-blocked", text: (ACTION_VERB[action] || "Save") + " failed: " + (detail || "unknown error")}
    };
    var m = map[mode] || map.offline;
    el.className = "sync-status " + m.cls;
    el.textContent = m.text;
  }

  var MAX_COMMIT_ATTEMPTS = 4;

  function commitTab(tab, attempt, action){
    attempt = attempt || 0;
    var settings = getSettings();
    if (!settings.token){ setSyncStatus(tab, "offline", null, action); return; }
    setSyncStatus(tab, "saving", null, action);
    var branch = settings.branch || "main";
    var getUrl = contentsUrl(tab, settings) + "?ref=" + encodeURIComponent(branch) + "&_=" + Date.now();
    fetch(getUrl, {headers: ghHeaders(settings.token), cache: "no-store"})
      .then(function(r){
        if (r.ok) return r.json();
        if (r.status === 404) return {sha: null};
        return Promise.reject(new Error("http " + r.status));
      })
      .then(function(info){
        var body = {
          message: "Update " + tab + ".json via Claims Reference Hub",
          content: utf8ToBase64(JSON.stringify(state[tab] || [], null, 2)),
          branch: branch
        };
        if (info && info.sha) body.sha = info.sha;
        return fetch(contentsUrl(tab, settings), {
          method: "PUT",
          headers: Object.assign({"Content-Type": "application/json"}, ghHeaders(settings.token)),
          body: JSON.stringify(body)
        });
      })
      .then(function(r){
        if (r.ok){ setSyncStatus(tab, "saved", null, action); return; }
        if (r.status === 409 && attempt < MAX_COMMIT_ATTEMPTS - 1){
          setTimeout(function(){ commitTab(tab, attempt + 1, action); }, 300 * (attempt + 1));
          return;
        }
        return r.json().catch(function(){ return {}; }).then(function(j){
          setSyncStatus(tab, "error", j.message || ("http " + r.status), action);
        });
      })
      .catch(function(err){ setSyncStatus(tab, "error", err.message, action); });
  }

  function hasWriteAccess(){
    return !!getSettings().token;
  }

  function blockNoAccess(){
    alert("You don't have write permission.\n\nConnect a GitHub token first (click the gear icon, top right) to add, edit, or delete rows.");
  }

  function updateConnPill(){
    var s = getSettings();
    var pill = document.getElementById("connPill");
    if (s.token){
      pill.innerHTML = '<span class="dot"></span>Synced to ' + escapeHtml(s.owner + "/" + s.repo);
    } else {
      pill.innerHTML = '<span class="dot bad"></span>Not connected';
    }
  }

  function openSettings(){
    var s = getSettings();
    document.getElementById("gh-ownerrepo").value = s.owner + "/" + s.repo;
    document.getElementById("gh-branch").value = s.branch || "main";
    document.getElementById("gh-token").value = s.token || "";
    document.getElementById("settingsOverlay").classList.add("open");
  }

  function closeSettings(){
    document.getElementById("settingsOverlay").classList.remove("open");
  }

  function wireSettings(){
    document.getElementById("settingsBtn").innerHTML = ICONS.gear;
    document.getElementById("settingsBtn").addEventListener("click", openSettings);
    document.getElementById("connPill").addEventListener("click", openSettings);
    document.getElementById("gh-cancel").addEventListener("click", closeSettings);
    document.getElementById("gh-save").addEventListener("click", function(){
      var ownerRepo = document.getElementById("gh-ownerrepo").value.trim();
      var parts = ownerRepo.split("/");
      var owner = (parts[0] || "").trim();
      var repo = (parts[1] || "").trim();
      var branch = document.getElementById("gh-branch").value.trim() || "main";
      var token = document.getElementById("gh-token").value.trim();
      if (!owner || !repo) return;
      saveSettings({owner: owner, repo: repo, branch: branch, token: token});
      updateConnPill();
      refreshAllSyncStatus();
      closeSettings();
    });
    document.getElementById("gh-disconnect").addEventListener("click", function(){
      var s = getSettings();
      s.token = "";
      saveSettings(s);
      updateConnPill();
      refreshAllSyncStatus();
      closeSettings();
    });
  }

  function refreshAllSyncStatus(){
    TABS.forEach(function(t){ setSyncStatus(t.id, hasWriteAccess() ? "idle" : "offline"); });
  }

  // ---------- seed loading (always from data/*.json — the shared source of truth) ----------

  function dataUrl(tab){ return "data/" + tab + ".json?_=" + Date.now(); }

  function fetchSeed(tab){
    return fetch(dataUrl(tab), {cache: "no-store"}).then(function(r){
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    }).catch(function(){ return null; });
  }

  function escapeHtml(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function statusChipClass(status){
    var s = (status || "").toLowerCase();
    if (s === "blocked") return "status-blocked";
    if (s === "done" || s === "production") return "status-done";
    if (s === "pending" || s === "development" || s === "ready for testing" || s === "testing" ||
        s === "rc testing" || s === "ready for production" || s === "in progress") return "status-progress";
    return "status-default";
  }

  function visibleRows(tab){
    var out = [];
    var q = (searchText[tab] || "").toLowerCase();
    (state[tab] || []).forEach(function(row, idx){
      if (row._deleted) return;
      if (q){
        var hit = Object.keys(row).some(function(k){
          return k.charAt(0) !== "_" && String(row[k] == null ? "" : row[k]).toLowerCase().indexOf(q) !== -1;
        });
        if (!hit) return;
      }
      out.push({row: row, idx: idx});
    });
    var sort = sortState[tab];
    if (sort.key){
      out.sort(function(a, b){
        var av = String(a.row[sort.key] == null ? "" : a.row[sort.key]).toLowerCase();
        var bv = String(b.row[sort.key] == null ? "" : b.row[sort.key]).toLowerCase();
        if (av < bv) return -1 * sort.dir;
        if (av > bv) return 1 * sort.dir;
        return 0;
      });
    }
    return out;
  }

  // ---------- theme ----------

  function effectiveTheme(){
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function paintThemeIcon(){
    document.getElementById("themeToggle").innerHTML = effectiveTheme() === "dark" ? ICONS.moon : ICONS.sun;
  }

  function initTheme(){
    var saved = null;
    try{ saved = localStorage.getItem(STORAGE_PREFIX + "theme"); }catch(e){}
    document.documentElement.setAttribute("data-theme", saved || "light");
    paintThemeIcon();
    document.getElementById("themeToggle").addEventListener("click", function(){
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try{ localStorage.setItem(STORAGE_PREFIX + "theme", next); }catch(e){}
      paintThemeIcon();
    });
  }

  // ---------- building the chrome (nav + panels) from TABS/SCHEMAS ----------

  function buildNav(){
    var nav = document.getElementById("tabNav");
    nav.innerHTML = TABS.map(function(t, i){
      return '<button data-tab="' + t.id + '"' + (i === 0 ? ' class="active"' : '') + '>' +
        (ICONS[t.id] || "") + '<span>' + escapeHtml(t.label) + '</span><span class="count" data-count="' + t.id + '">0</span></button>';
    }).join("");
  }

  function fieldCellHtml(field, row){
    var val = row[field.key];
    if (field.type === "url"){
      var url = val || "#";
      return "<td><a href='" + escapeHtml(url) + "' target='_blank' rel='noopener'>" + escapeHtml(url) + "</a></td>";
    }
    if (field.type === "select"){
      return "<td><span class='chip " + statusChipClass(val) + "'>" + escapeHtml(val) + "</span></td>";
    }
    var cls = [];
    if (field.mono) cls.push("mono");
    if (field.wrap) cls.push("wrap-cell");
    return "<td" + (cls.length ? " class='" + cls.join(" ") + "'" : "") + ">" + escapeHtml(val) + "</td>";
  }

  function buildPanels(){
    var host = document.getElementById("panels");
    host.innerHTML = TABS.map(function(t, i){
      var headCols = t.fields.map(function(f){
        return '<th data-sort="' + f.key + '" data-tab="' + t.id + '">' + escapeHtml(f.label) + '<span class="sort-arrow">↕</span></th>';
      }).join("") + "<th></th>";
      return (
        '<section class="panel' + (i === 0 ? ' active' : '') + '" id="panel-' + t.id + '">' +
          '<div class="panel-head">' +
            '<div><h2>' + escapeHtml(t.title) + '<span class="count-badge" id="badge-' + t.id + '">0</span></h2>' +
              '<div class="sub">' + escapeHtml(t.sub) + '</div>' +
              '<span class="sync-status" id="sync-' + t.id + '"></span>' +
            '</div>' +
          '</div>' +
          '<div class="actions">' +
            '<div class="search-wrap">' + ICONS.search + '<input type="text" id="search-' + t.id + '" placeholder="Search…"></div>' +
            (t.hideExportJson ? "" : '<button class="btn" data-export-json="' + t.id + '">' + ICONS.download + ' Export JSON</button>') +
            '<button class="btn" data-export-csv="' + t.id + '">Export CSV</button>' +
            '<button class="btn primary" data-add="' + t.id + '">' + ICONS.plus + ' Add</button>' +
          '</div>' +
          '<div class="table-wrap"><table><thead><tr>' + headCols + '</tr></thead>' +
            '<tbody id="rows-' + t.id + '"></tbody>' +
          '</table></div>' +
          '<div class="pagination" id="pager-' + t.id + '">' +
            '<button class="btn" data-page-prev="' + t.id + '" id="pager-prev-' + t.id + '">' + ICONS.chevLeft + ' Prev</button>' +
            '<span class="pager-info" id="pager-info-' + t.id + '"></span>' +
            '<button class="btn" data-page-next="' + t.id + '" id="pager-next-' + t.id + '">Next ' + ICONS.chevRight + '</button>' +
            '<select class="page-size" data-page-size="' + t.id + '">' +
              '<option value="25">25 / page</option>' +
              '<option value="50" selected>50 / page</option>' +
              '<option value="100">100 / page</option>' +
              '<option value="999999">All</option>' +
            '</select>' +
          '</div>' +
        '</section>'
      );
    }).join("");
  }

  // ---------- rendering ----------

  function updateCounts(tab, total){
    var badge = document.getElementById("badge-" + tab);
    if (badge) badge.textContent = total + (total === 1 ? " item" : " items");
    var navCount = document.querySelector('[data-count="' + tab + '"]');
    if (navCount) navCount.textContent = total;
  }

  function updateSortIndicators(tab){
    var sort = sortState[tab];
    document.querySelectorAll('th[data-tab="' + tab + '"]').forEach(function(th){
      var key = th.getAttribute("data-sort");
      var arrow = th.querySelector(".sort-arrow");
      if (key === sort.key){
        th.classList.add("sorted");
        arrow.textContent = sort.dir === 1 ? "↑" : "↓";
      } else {
        th.classList.remove("sorted");
        arrow.textContent = "↕";
      }
    });
  }

  function updatePager(tab, total, totalPages){
    var ps = pageState[tab];
    document.getElementById("pager-info-" + tab).textContent = "Page " + ps.page + " of " + totalPages + " (" + total + " total)";
    document.getElementById("pager-prev-" + tab).disabled = ps.page <= 1;
    document.getElementById("pager-next-" + tab).disabled = ps.page >= totalPages;
  }

  function render(tab){
    var tbody = document.getElementById("rows-" + tab);
    if (!tbody) return;
    var all = visibleRows(tab);
    var fields = SCHEMAS[tab].fields;
    updateCounts(tab, all.length);
    updateSortIndicators(tab);

    var ps = pageState[tab];
    var totalPages = Math.max(1, Math.ceil(all.length / ps.size));
    if (ps.page > totalPages) ps.page = totalPages;
    if (ps.page < 1) ps.page = 1;
    var start = (ps.page - 1) * ps.size;
    var rows = all.slice(start, start + ps.size);
    updatePager(tab, all.length, totalPages);

    if (!rows.length){
      var colCount = fields.length + 1;
      var msg = searchText[tab] ? "No matches for &ldquo;" + escapeHtml(searchText[tab]) + "&rdquo;." : "No entries yet. Click &ldquo;+ Add&rdquo; to create one.";
      tbody.innerHTML = '<tr><td class="empty-state" colspan="' + colCount + '">' + ICONS.inbox +
        '<div>' + msg + '</div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function(entry){
      var row = entry.row, idx = entry.idx;
      var cells = fields.map(function(f){ return fieldCellHtml(f, row); }).join("");
      return "<tr>" + cells +
        "<td class='row-actions'>" +
          "<button class='icon-btn' data-edit='" + tab + "' data-idx='" + idx + "' title='Edit'>" + ICONS.edit + "</button>" +
          "<button class='icon-btn danger' data-del='" + tab + "' data-idx='" + idx + "' title='Delete'>" + ICONS.trash + "</button>" +
        "</td></tr>";
    }).join("");
  }

  // ---------- export ----------

  function downloadBlob(content, filename, mime){
    var blob = new Blob([content], {type: mime});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }

  function csvEscape(v){
    v = String(v == null ? "" : v);
    if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
    return v;
  }

  function exportCsv(tab){
    var cols = SCHEMAS[tab].fields.map(function(f){ return f.key; });
    var rows = visibleRows(tab).map(function(e){ return e.row; });
    var lines = [cols.join(",")];
    rows.forEach(function(r){
      lines.push(cols.map(function(c){ return csvEscape(r[c]); }).join(","));
    });
    downloadBlob(lines.join("\r\n"), tab + ".csv", "text/csv;charset=utf-8;");
  }

  function exportJson(tab){
    downloadBlob(JSON.stringify(state[tab] || [], null, 2), tab + ".json", "application/json");
  }

  // ---------- mutations ----------

  function persist(tab, action){
    render(tab);
    commitTab(tab, 0, action);
  }

  function addRow(tab, data){
    state[tab].push(data);
    persist(tab, "add");
  }

  function updateRow(tab, idx, data){
    var existing = state[tab][idx] || {};
    data._deleted = existing._deleted;
    state[tab][idx] = data;
    persist(tab, "update");
  }

  function hideRow(tab, idx){
    state[tab][idx]._deleted = true;
    persist(tab, "delete");
  }

  // ---------- add/edit modal ----------

  function fieldInputHtml(field){
    var common = 'data-f="' + field.key + '" placeholder="' + escapeHtml(field.placeholder || "") + '"';
    if (field.type === "select"){
      var opts = field.options.map(function(o){ return "<option>" + escapeHtml(o) + "</option>"; }).join("");
      return '<select data-f="' + field.key + '">' + opts + '</select>';
    }
    if (field.wrap){
      return '<textarea ' + common + '></textarea>';
    }
    return '<input ' + common + '>';
  }

  function openFormModal(tab, idx){
    modal.tab = tab;
    modal.idx = (idx == null) ? null : idx;
    var schema = SCHEMAS[tab];
    document.getElementById("formTitle").textContent = (idx == null) ? "Add new" : "Edit entry";
    var fieldsHost = document.getElementById("formFields");
    fieldsHost.innerHTML = schema.fields.map(function(f){
      return '<div' + (f.wrap ? ' class="wrap-field"' : '') + '><label>' + escapeHtml(f.label) + '</label>' + fieldInputHtml(f) + '</div>';
    }).join("");
    if (idx != null){
      var row = state[tab][idx];
      fieldsHost.querySelectorAll("[data-f]").forEach(function(el){
        el.value = row[el.getAttribute("data-f")] || "";
      });
    }
    document.getElementById("formOverlay").classList.add("open");
    var firstInput = fieldsHost.querySelector("[data-f]");
    if (firstInput) firstInput.focus();
  }

  function closeFormModal(){
    document.getElementById("formOverlay").classList.remove("open");
    modal.tab = null;
    modal.idx = null;
  }

  function saveFormModal(){
    var tab = modal.tab;
    if (!tab) return;
    var fieldsHost = document.getElementById("formFields");
    var data = {};
    fieldsHost.querySelectorAll("[data-f]").forEach(function(el){ data[el.getAttribute("data-f")] = el.value.trim(); });
    var labelField = SCHEMAS[tab].idField;
    if (!data[labelField]) return;
    if (modal.idx != null){
      updateRow(tab, modal.idx, data);
    } else {
      addRow(tab, data);
    }
    closeFormModal();
  }

  function wireFormModal(){
    document.getElementById("formCancel").addEventListener("click", closeFormModal);
    document.getElementById("formSave").addEventListener("click", saveFormModal);
  }

  // ---------- confirm modal ----------

  function openConfirm(tab, idx){
    pendingDelete = {tab: tab, idx: idx};
    document.getElementById("confirmOverlay").classList.add("open");
  }

  function closeConfirm(){
    pendingDelete = null;
    document.getElementById("confirmOverlay").classList.remove("open");
  }

  function wireConfirmModal(){
    document.getElementById("confirmCancel").addEventListener("click", closeConfirm);
    document.getElementById("confirmOk").addEventListener("click", function(){
      if (pendingDelete) hideRow(pendingDelete.tab, pendingDelete.idx);
      closeConfirm();
    });
  }

  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){ closeFormModal(); closeConfirm(); closeSettings(); }
  });

  // ---------- delegation ----------

  function wireRowActionDelegation(){
    document.getElementById("panels").addEventListener("click", function(e){
      var addBtn = e.target.closest("[data-add]");
      if (addBtn){
        if (!hasWriteAccess()){ blockNoAccess(); return; }
        openFormModal(addBtn.getAttribute("data-add"), null);
        return;
      }

      var editBtn = e.target.closest("[data-edit]");
      if (editBtn){
        if (!hasWriteAccess()){ blockNoAccess(); return; }
        openFormModal(editBtn.getAttribute("data-edit"), parseInt(editBtn.getAttribute("data-idx"), 10));
        return;
      }
      var delBtn = e.target.closest("[data-del]");
      if (delBtn){
        if (!hasWriteAccess()){ blockNoAccess(); return; }
        openConfirm(delBtn.getAttribute("data-del"), parseInt(delBtn.getAttribute("data-idx"), 10));
        return;
      }
      var th = e.target.closest("th[data-sort]");
      if (th){
        var tab = th.getAttribute("data-tab");
        var key = th.getAttribute("data-sort");
        var sort = sortState[tab];
        if (sort.key === key) sort.dir *= -1;
        else { sort.key = key; sort.dir = 1; }
        pageState[tab].page = 1;
        render(tab);
        return;
      }
      var prevBtn = e.target.closest("[data-page-prev]");
      if (prevBtn){
        var pt = prevBtn.getAttribute("data-page-prev");
        pageState[pt].page -= 1;
        render(pt);
        return;
      }
      var nextBtn = e.target.closest("[data-page-next]");
      if (nextBtn){
        var nt = nextBtn.getAttribute("data-page-next");
        pageState[nt].page += 1;
        render(nt);
      }
    });

    document.getElementById("panels").addEventListener("change", function(e){
      var sel = e.target.closest("[data-page-size]");
      if (sel){
        var tab = sel.getAttribute("data-page-size");
        pageState[tab].size = parseInt(sel.value, 10);
        pageState[tab].page = 1;
        render(tab);
      }
    });
  }

  function wireSearch(){
    TABS.forEach(function(t){
      var input = document.getElementById("search-" + t.id);
      input.addEventListener("input", function(){
        searchText[t.id] = input.value;
        pageState[t.id].page = 1;
        render(t.id);
      });
    });
  }

  function wireExportButtons(){
    document.querySelectorAll("[data-export-json]").forEach(function(btn){
      btn.addEventListener("click", function(){ exportJson(btn.getAttribute("data-export-json")); });
    });
    document.querySelectorAll("[data-export-csv]").forEach(function(btn){
      btn.addEventListener("click", function(){ exportCsv(btn.getAttribute("data-export-csv")); });
    });
  }

  function wireTabs(){
    document.querySelectorAll("#tabNav button").forEach(function(btn){
      btn.addEventListener("click", function(){
        document.querySelectorAll("#tabNav button").forEach(function(b){ b.classList.remove("active"); });
        document.querySelectorAll(".panel").forEach(function(p){ p.classList.remove("active"); });
        btn.classList.add("active");
        document.getElementById("panel-" + btn.getAttribute("data-tab")).classList.add("active");
      });
    });
  }

  function showFetchWarning(tabs){
    var el = document.getElementById("fetchWarn");
    el.textContent = "Couldn't load seed data for: " + tabs.join(", ") +
      ". If you opened this file directly (file://), serve it over http instead " +
      "(e.g. run `npx serve` in this folder, or use the hosted GitHub Pages link) so the data/*.json files can load.";
    el.classList.add("show");
  }

  function init(){
    initTheme();
    updateConnPill();
    buildNav();
    buildPanels();
    wireTabs();
    wireRowActionDelegation();
    wireExportButtons();
    wireSearch();
    wireFormModal();
    wireConfirmModal();
    wireSettings();
    if (!hasWriteAccess()){
      TABS.forEach(function(t){ setSyncStatus(t.id, "offline"); });
    }

    var failed = [];
    var loaders = TABS.map(function(t){
      var tab = t.id;
      return fetchSeed(tab).then(function(seed){
        if (seed == null){
          failed.push(tab);
          state[tab] = [];
        } else {
          state[tab] = seed;
        }
        render(tab);
      });
    });

    Promise.all(loaders).then(function(){
      if (failed.length) showFetchWarning(failed);
    });
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
