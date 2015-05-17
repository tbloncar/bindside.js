/**
 * binder.js | version 0.0.1
 * (c) Travis Loncar (https://github.com/tbloncar)
 */

var binder = (function __binder__() {
  function ViewModel(selector) {
		var _selector = selector || 'body';

    this.el = document.querySelector(_selector); 
    this.props = {};
    this.actions = {};
  }

  ViewModel.prototype.prop = function(name, cb) {
		var nodes, node;

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
          this.props[name] = val; 

					nodes = this.getNodesForProp(name);

					for(var i = 0, l = nodes.length; i < l; i++) {
						node = nodes[i];

						console.log(node.constructor);

						if(node instanceof HTMLInputElement ||
							 node instanceof HTMLTextAreaElement) {
							node.value = val;			
						}	else {
							node.innerHTML = val;	
						}
					}
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

	ViewModel.prototype.getNodesForProp = function(prop) {
		return this.el.querySelectorAll('[data-prop="' + prop + '"]');
	};

  ViewModel.prototype.bindProps = function() {
    var self = this;

    for(var p in this.props) {
      var nodes = self.getNodesForProp(p);

      (function(p) {
				for(var i = 0, l = nodes.length; i < l; i++) {
					nodes[i].addEventListener('change', function(e) {
            if(this instanceof HTMLInputElement ||
							 this instanceof HTMLTextAreaElement) {
              self[p](this.value); 
            }
          }); 
				}
      })(p);
    }
  };

  function createViewModel(selector, cb) {
    var vm = new ViewModel(selector); 
    cb(vm);

    if(document.readyState !== 'loading') {
      vm.bindProps(); 
    } else {
      document.addEventListener('DOMContentLoaded', vm.bindProps.bind(vm));
    }

		return vm;
  }

  return {
    createViewModel: createViewModel 
  };
})();
