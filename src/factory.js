var Factory =  (function() {
  // Private properties
  var constructors = {},

  // Private methods

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

    constructors[type] = constrFn;
  },

  // Build a object using a constructor type
  build = function(type) {

    // error if the constructor does not exist
    if (typeof constructors[type] !== "function") {
      throw {
        name: "NonExistentError",
        message: type + " doesn't exist"
      };
    }

    // Build the object
    return new constructors[type]();
  };
  // end var

  // Revealing public API;
  return {
    define: define,
    build: build
  };
}());
