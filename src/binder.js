/**
 * binder.js | version 0.0.1
 * (c) Travis Loncar (https://github.com/tbloncar)
 */

var binder = (function __binder__() {
  function ViewModel(selector) {
    this.el = document.querySelector(selector); 
    this.props = {};
    this.actions = {};
  }

  ViewModel.prototype.prop = function(name, cb) {
    if(cb) {
      this.props[name] = function() {
        cb.call(this); 
      }; 
    } else {
      this.props[name] = null; 
    }

    this[name] = function(val) {
      if(cb) {
        if(val) {
          throw 'Cannot assign to computed property.'; 
        }

        return this.props[name](); 
      } else {
        if(val) {
          return this.props[name] = val; 
        } else {
          return this.props[name];
        }
      }
    };
  };

  ViewModel.prototype.action = function(name, cb) {
    var self = this;

    this.actions[name] = function() {
      cb.call(self.props);
    };
  };

  ViewModel.prototype.bindProps = function() {
    var self = this;

    for(var p in this.props) {
      var nodes = document.querySelectorAll('[data-prop="' + p + '"]');

      (function(p) {
        nodes.forEach(function(node) {
          node.addEventListener('change', function(e) {
            if(this instanceof HTMLInputElement) {
              self[p](this.value); 
            }
          }); 
        });
      })(p);
    }
  };

  function createViewModel(selector, cb) {
    var vm = new ViewModel(selector); 
    cb(vm);

    if(document.readyState !== 'loading') {
      vm.bindProps(); 
    } else {
      document.addEventListener('DOMContentLoaded', vm.bindProps);
    }
  }

  return {
    createViewModel: createViewModel 
  };
})();

// <input type="text" data-prop="lastName"></input>
