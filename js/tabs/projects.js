(function(){
  "use strict";
  window.TAB_CONFIGS = window.TAB_CONFIGS || [];
  window.TAB_CONFIGS.push({
    id: "projects",
    label: "Projects",
    title: "Claims Applications",
    hideExportJson: true,
    sub: "Every application/repo in the Claims ecosystem",
    idField: "name",
    fields: [
      {key:"name", label:"Name", placeholder:"e.g. Apollo"},
      {key:"repo", label:"Repo", placeholder:"e.g. AIApplications", mono:true},
      {key:"type", label:"Type", placeholder:"e.g. Azure Container App"},
      {key:"description", label:"Description", placeholder:"One line", wrap:true}
    ]
  });
})();
