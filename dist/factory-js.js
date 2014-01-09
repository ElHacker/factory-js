var Factory =  (function() {
  // Private properties
  var constructors = {},

  // Private methods

  // Augments a constructor provided by the client
  // adds properties and functions used to handle sequences
  augmentConstructor = function(constrFn) {

    // Helper function to give a unique number
    // per instace of the constructor and assign that number
    // to a property of the instace
    constrFn.propertiesToSequence = [];
    constrFn.sequence = function(property, fn) {
      this.propertiesToSequence.push({
        "property": property,
        "fn": fn
      });
      return this;
    };

    // AutoIncrement increments a counter per instance
    constrFn.prototype.autoIncrement = (function() {
      var count = 0;
      return function(property, fn) {
        if(typeof this.autoIncremented === "undefined" || this.autoIncremented !== true) {
          count += 1;
          this.autoIncremented = true;
        }
        if(typeof fn === "function") {
          this[property] = fn(count);
        } else {
          this[property] = count;
        }
      };
    }());
    return constrFn;
  },

  // Defines a constructor type
  define = function(type, constrFn) {

    if (typeof constrFn !== "function") {
      throw {
        name: "NotAFunctionError",
        message: "constrFn is not a function; it is a: " + typeof constrFn
      };
    }

    if (constructors.hasOwnProperty(type)) {
      throw {
        name: "AlreadyDefinedType",
        message: "that object type was already defined"
      };
    }
    augmentConstructor(constrFn);
    constructors[type] = constrFn;

    return constructors[type];
  },

  // Builds a object using a constructor type
  build = function(type) {
    var objectBuilt = {},
        autoIncrementObj = {},
        i;
    // error if the constructor does not exist
    if (typeof constructors[type] !== "function") {
      throw {
        name: "NotSuchConstructorError",
        message: type + " doesn't exist"
      };
    }

    // Build the object
     objectBuilt = new constructors[type]();
     // Call its autoincrement method per property needed
     for(i = 0; i < constructors[type].propertiesToSequence.length; i += 1) {
       autoIncrementObj = constructors[type].propertiesToSequence[i];
       objectBuilt.autoIncrement(autoIncrementObj.property, autoIncrementObj.fn);
     }
     return objectBuilt;
  },

  // Build a list of objects using a constructor type
  buildList = function(type, quantity){
    var objectList = [],
        i = 0;

    for(;i < quantity; i += 1) {
      objectList.push(build(type));
    }

    return objectList;
  };
  // end var

  // Revealing public API;
  return {
    define: define,
    build: build,
    buildList: buildList
  };

}());
