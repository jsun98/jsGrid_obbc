var table = require("./library/table.js");
var fields = require("./library/fields.js");
var nav = require('./library/nav.js');


$(document).ready(function() {
  nav($);


  table.createTable("result", fields.getFields("result"));

  $('#home').click(function() {window.location.replace("/");});
});