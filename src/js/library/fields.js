/******************************************************************************
Fields
******************************************************************************/
var defaults = require('./defaults.js').getDefaults();

var exports = module.exports;

//type = ["newdata","search"]
exports.getFields = function (type) {

  var newFields = fields;

  for (var i = 0; i < newFields.length; i++) {

    var item = newFields[i];

    //set type
    if (item.type == undefined || item.type.type == "")
      item.type = "text";

    //set alignment
    item.align = "center";

    //set validate except for ClientID
    //if (item.name !== "ClientID")
    item.validate = "required";

    //set display headings
    setTitle(item);

    //set width
    setColumnWidth(item);
  }

  var control = {};

  if (type === "newdata") {

    var hideColumns = [
      "DepartmentCode",
      "RequestType",
      "Status",
      "Env",
      "ClientID",
      "ID",
      "SubmissionDate"
    ];

    for (var i = 0; i < newFields.length; i++) {

      var item = newFields[i];

      if (hideColumns.indexOf(item.name)>-1)
        item.visible = false;


    }

    //add control column
    control = {
        type: "control",
        name: "Control",
        width: "80px",
        modeSwitchButton: false,
        editButton: false,
        headerTemplate: function() {
            return $("<button>").attr("type", "button").attr("id","control-btn").text("New Data");
        }
    };

  } else if (type === "search") {

    var hideColumns = [
      "RequestType",
      "Env",
      "DepartmentCode"
    ];

    for (var i = 0; i < newFields.length; i++) {

      var item = newFields[i];

      setEditTemplate(item);

      if (hideColumns.indexOf(item.name)>-1)
        item.visible = false;

      if (item.name==="ClientID")
        item.validate = "";

      //initialize insert template
      setDefaultInsertTemplate(item);

    }

    control = {
      name: "control",
      type: "control",
      deleteButton: false,
      editButton: false,
      width:"80px"
    }

  } else if (type === "result") {
    var hideColumns = [
      "DepartmentCode",
      "RequestType",
    ];

    for (var i = 0; i < newFields.length; i++) {

      var item = newFields[i];

      if (hideColumns.indexOf(item.name)>-1)
        item.visible = false;
    }
  } else {

  }

  if (control !== {})
    newFields.unshift(control);

  return newFields;
}



/******************************************************************************
Private functions
******************************************************************************/



function setTitle (item) {
  //trim off 'Type'
  if (item.name.substring(0,4)==="Type") {
    item.title = item.name.substring(4,item.name.length);
  } else {
    item.title = item.name;
  }
  //change "ID" to "Id" for consistency
  item.title = item.title.replace(/ID/g, "Id");
  //insert space between capital letters
  item.title = item.title.replace(/([A-Z])/g, ' $1').trim()
}

function setColumnWidth(item) {
  var baseWidth;
  if (item.title==="Id")
    baseWidth = 100;
  else
    baseWidth = 35;
  return item.width=(item.title.length*12+baseWidth).toString()+"px";
}

function setDefaultInsertTemplate (item) {
  var value = defaults[item.name];
  item.insertTemplate = function () {
    var input = this.__proto__.insertTemplate.call(this);
    input.val(value)
    return input;
  }
}

function setEditTemplate(col) {
  if (col.name === "Status") {
    col.editTemplate = function (value, item) {
      var $select = this.__proto__.editTemplate.call(this);
      $select.val(value);
      $select.find("option[value='']").remove();
      if (item.Status==="submitted") {
        $select.find("option[value='new']").remove();
        $select.find("option[value='used']").remove();
        $select.find("option[value='failed']").remove();
      } else if (item.Status==="failed") {
        $select.find("option[value='new']").remove();
        $select.find("option[value='used']").remove();
      } else if (item.Status==="new") {
        $select.find("option[value='failed']").remove();
        $select.find("option[value='terminated']").remove();
        $select.find("option[value='submitted']").remove();
      }
      return $select;
    }
  } else {

    col.editTemplate = function (value, item) {
      var $input = this.__proto__.editTemplate.call(this);
      $input.prop("value",value);
      if (item.Status==="submitted" || item.Status==="failed") {
        if (col.name === "ClientID" ||
            col.name === "UserID" ||
            col.name === "ID" ||
            col.name === "SubmissionDate")
        {
          $input.prop('readonly', true);
          $input.css('background-color' , '#EBEBE4');
        }
      } else {
        $input.prop('readonly', true);
        $input.css('background-color' , '#EBEBE4');
      }
      return $input;
    }

  }
}


var fields =
[
  { name: "ClientID"},
  { name: "Status", type: "select",
    items: [
      {Id: ""},
      {Id: "submitted"},
      {Id: "new"},
      {Id: "used"},
      {Id: "failed"},
      {Id: "terminated"}],
    valueField: "Id",
    textField: "Id"},
  { name: "UserID"},
  { name: "Description"},
  { name: "TypeDepartmentId"},
  { name: "DepartmentCode"},
  { name: "ID"},
  { name: "RequestType"},
  { name: "Env"},
  { name: "SubmissionDate"},
  { name: "Gender"},
  { name: "BirthDate"},
  { name: "NationalIdType"},
  { name: "CountryCode"},
  { name: "AddressLine1"},
  { name: "AddressCity"},
  { name: "AddressState"},
  { name: "AddressPostalCode"},
  { name: "Format"},
  { name: "PhoneType"},
  { name: "PhoneNumber"},
  { name: "EmpRecordType"},
  { name: "FulltimePartTime"},
  { name: "HireDate"},
  { name: "JobCode"},
  { name: "EmpClass"},
  { name: "UnionCode"},
  { name: "RateCode"},
  { name: "BenefitSystem"},
  { name: "TypeCompRate"},
  { name: "BenefitProgramName"},
  { name: "EnrolmentDate"},
  { name: "NotificationType"},
  { name: "PensionPlanType"},
  { name: "MemberClass"}
];
