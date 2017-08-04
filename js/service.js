$(document).ready(function () {
    var crudServiceBaseURL = "https://demos.telerik.com/kendo-ui/service"

    dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: crudServiceBaseURL + "/Products",
          dataType: "jsonp"
        },
        update:{
          url: crudServiceBaseURL + "/Products/Update",
          dataType: "jsonp"
        },
        destroy:{
          url: crudServiceBaseURL + "/Products/Destroy",
          dataType: "jsonp"
        },
        create:{
          url: crudServiceBaseURL + "/Products/Create",
          dataType: "jsonp"
        },
        parameterMap: function(options, operation){
          if (operation !== "read" && options.models){
            return { models: kendo.stringify(options.models)};
          }
        }
      },
      batch: true,
      pageSize: 20,
      schema:{
        model: {
          id: "ProductID",
          fields: {
            ProductID: {editable: false, nullable: true},
            ProductName:{ validation: { required: true}},
            UnitPrice:{type:"number", validation: {required: true, min:1 }},
            Discontinued:{type: "boolean"},
            UnitsInStock:{type: "number", validation:{min: 0, required: true}}
          }
        }
      }
    });
    $('#grid').kendoGrid({
      dataSource: dataSource,
      pageable: true,
      height: 500,
      toolbar:["create", "save" , "cancel"],
      columns:[
        {field:"ProductName", title:"Product Name", width:"7.500em"},
        {field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "7.500em"},
        {field: "UnitsInStock", title:"Unit In Stock", width: "7.500em"},
        {field: "Discontinued", width:"7.500em", editor: customBoolEditor},
        {command: ["destroy"], title:"&nbsp", width:50}
      ],
      editable: true
    });
});

function customBoolEditor(container, options){
  $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
  $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
}
