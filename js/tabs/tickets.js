(function(){
  "use strict";
  window.TAB_CONFIGS = window.TAB_CONFIGS || [];
  window.TAB_CONFIGS.push({
    id: "tickets",
    label: "Tickets",
    title: "Tickets",
    hideExportJson: true,
    sub: "What I'm working on and what my teammates are working on",
    idField: "ticketId",
    fields: [
      {key:"ticketId", label:"Ticket ID", placeholder:"e.g. CLAIM-1598", mono:true},
      {key:"title", label:"Title", placeholder:"Short title"},
      {key:"status", label:"Status", type:"select", options:["To Do","Blocked","Pending","Development","Ready for Testing","Testing","RC Testing","Ready for Production","Production","Done"]},
      {key:"sprint", label:"Sprint", placeholder:"e.g. Sprint 24.19"},
      {key:"assignee", label:"Assignee", placeholder:"Me / teammate name"},
      {key:"notes", label:"Notes", placeholder:"Short status note", wrap:true}
    ]
  });
})();
