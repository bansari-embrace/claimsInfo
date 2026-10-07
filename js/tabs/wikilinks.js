(function(){
  "use strict";
  window.TAB_CONFIGS = window.TAB_CONFIGS || [];
  window.TAB_CONFIGS.push({
    id: "wikilinks",
    label: "Wiki & Links",
    title: "Wiki & Reference Links",
    hideExportJson: true,
    sub: "Repos, KAD docs, portals — anything worth bookmarking",
    idField: "title",
    fields: [
      {key:"title", label:"Title", placeholder:"e.g. epi.WWF repo"},
      {key:"url", label:"URL", placeholder:"https://…", type:"url"},
      {key:"category", label:"Category", placeholder:"e.g. Repo / KAD / Portal"}
    ]
  });
})();
