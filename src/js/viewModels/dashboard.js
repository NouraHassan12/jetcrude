/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils','knockout', 'ojs/ojmodel',
'ojs/ojcollectiondataprovider','ojs/ojarraydataprovider',
'ojs/ojkeyset',
'ojs/ojbufferingdataprovider',
'text!data/data.json',
'jquery','ojs/ojcore', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider',  'ojs/ojknockout', 'ojs/ojinputtext',
'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojformlayout', 'ojs/ojtoolbar', 'ojs/ojmessages'],
function( accUtils, ko, Model, CollectionDataProvider,  ArrayDataProvider ,  KeySet,  BufferingDataProvider, file,){
    function DashboardViewModel() {



      // var employee =JSON.parse(file)
      // this.empObservableArray = ko.observableArray(employee);
      // this.dataprovider =
      //  new BufferingDataProvider(
      //   new oj.ArrayDataProvider(this.empObservableArray, { keyAttributes: 'id' })
      //   );


      var RESTurl = "https://api.mocki.io/v1/b95a48c5";

      var employeeModel = Model.Model.extend({
        urlRoot: RESTurl,
        idAttribute: 'id'
     });


     this.myEmp = new employeeModel();
     var employeeCollection = new Model.Collection.extend({
     url: RESTurl,
     model: this.myEmp,
     comparator: 'id'
});

this.myEmpCol = new employeeCollection();
this.dataprovider = 
new BufferingDataProvider(
new CollectionDataProvider( this.myEmpCol , { keyAttributes: 'id' })
);



      
      this.groupValid = ko.observable();
  
     
      this.inputemployeeId = ko.observable();
      this.inputemployeeLastName = ko.observable();
      this.inputemployeeFirstName = ko.observable();
      
  
      this.firstSelected = ko.observable();
      this.disableSubmit = ko.observable(true);
  
  
      // Add a new row
      this.addRow = function () {
        if (this.groupValid() !== 'invalidShown') {
          var emp = {
            id: this.inputemployeeId(),
            lastName: this.inputemployeeLastName(),
            firstName: this.inputemployeeFirstName(),
           
          };
          this.dataprovider.addItem({metadata: {key: emp.id}, data: emp});
        }
      }.bind(this);
  
      // Update the selected row
      this.updateRow = function () {
        if (this.groupValid() !== 'invalidShown') {
          var element = document.getElementById('table');
          var currentRow = element.currentRow;
  
          if (currentRow != null) {
            var key = this.inputemployeeId();
            var newData = {
              id: this.inputemployeeId(),
              lastName: this.inputemployeeLastName(),
              firstName: this.inputemployeeFirstName(),
             
            };
            this.dataprovider.updateItem({metadata: {key: key}, data: newData});
          }
        }
      }.bind(this);
  
      // Remove the selected row
      this.removeRow = function () {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;
  
        if (currentRow != null) {
          var dataObj = element.getDataForVisibleRow(currentRow.rowIndex);
          this.dataprovider.removeItem({metadata: {key: dataObj.key}, data: dataObj.data});
          // Clear the table selection
          element.selected = {row: new KeySet.KeySetImpl(), column: new KeySet.KeySetImpl()};
        }
      }.bind(this);
  
     

      // Listener for updating the form when row selection changes in the table
      this.firstSelectedRowChangedListener = function (event) {
        var itemContext = event.detail.value;
        if (itemContext && itemContext.data) {
          var emp = itemContext.data;
          this.inputemployeeId(emp.id);
          this.inputemployeeLastName(emp.lastName);
          this.inputemployeeFirstName(emp.firstName);
 
        }
      }.bind(this);

    

      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };

      this.isEmptyTable = ko.observable(false);
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     * 
     * 
     * 
     */


   
    return DashboardViewModel;


  }
);
