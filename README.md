bindside.js
-----------

Just another data binding / view model library for the DOM.

HTML:

    <input type="text" data-bs-prop="firstName"> 
    <input type="text" data-bs-prop="lastName">

    <h1 data-bs-prop="fullName"></h1>

    <button type="button" data-bs-action="click::upcaseFirstName">UPCASE First Name</button>
    <button type="button" data-bs-action="click::reverseLastName">REVERSE Last Name</button>

JS:

    var vm = bindside.createViewModel('.container', function(vm) {
      // properties
      vm.prop('firstName'); 
      vm.prop('lastName'); 

      // computed property
      vm.prop('fullName', function() {
        return this.firstName() + ' ' + this.lastName();
      });

      // actions
      vm.action('reverseLastName', function() {
        this.lastName(this.lastName().split('').reverse().join('')); 
      });
      vm.action('upcaseFirstName', function() {
        this.firstName(this.firstName().toUpperCase()); 
      });

      // provide model
      vm.model({ firstName: 'Bob', lastName: 'Sacamano' });
    }); 
