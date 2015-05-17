bindside.js
-----------

Just another data binding / view model library for the DOM.

    var vm = bindside.createViewModel('.container', function(vm) {
      vm.prop('firstName'); 
      vm.prop('lastName'); 

      // computed property
      vm.prop('fullName', function() {
        return this.firstName() + ' ' + this.lastName();
      });

      // provide model
      vm.model({ firstName: 'Bob', lastName: 'Sacamano' });
    }); 
