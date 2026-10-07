(function(){
  "use strict";
  window.TAB_CONFIGS = window.TAB_CONFIGS || [];
  window.TAB_CONFIGS.push({
    id: "dbinfo",
    label: "Database Info",
    title: "Database Info",
    hideExportJson: true,
    sub: "Database type, associated application, and auth mechanism per environment",
    idField: "application",
    fields: [
      {key:"application", label:"Application", placeholder:"e.g. CRM"},
      {key:"dbType", label:"DB Type", placeholder:"e.g. SQL Server"},
      {key:"auth", label:"Authentication", placeholder:"e.g. Windows Authentication"},
      {key:"dev", label:"Dev", placeholder:"server name", mono:true},
      {key:"rc", label:"RC", placeholder:"server name", mono:true},
      {key:"prod", label:"Prod", placeholder:"server name", mono:true}
    ]
  });
})();
