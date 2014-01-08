test("Factory.define(type, constrFn)", function() {
  expect(2);

  // Check for the right errors to happen
  throws(
    function() {
      Factory.define("player", "not a function");
    },
    /constrFn is not a function/,
    "raises error, constrFn is not a function"
  );

  throws(
    function() {
      Factory.define("player", function() {});
      Factory.define("player", function() {});
    },
    /already defined/,
    "raises error, type was already defined"
  );

});

test("Factory.build(type)", function() {
  expect(2);

  // Check for building objects
  var SimpleObjectConstructor = function() {
    this.name = "simple";
  },
  aSimpleObject = {};

  Factory.define("simple", SimpleObjectConstructor);
  aSimpleObject = Factory.build("simple");

  ok(aSimpleObject instanceof SimpleObjectConstructor, "it is an instance of its original constructor");

  // Check for right errors
  throws(
    function() {
      Factory.build("nonexistent");
    },
    /doesn't exist/,
    "raises error, constructor type doesn't exists"
  );

});
