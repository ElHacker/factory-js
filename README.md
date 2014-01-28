factory-js
==========

Factory for building Javascript objects.

Usage
=========

```javascript
var note;
Factory.define("note", NoteConstructor).defaults({title:"A good note"});
note = Factory.build("note");
```

##Define a Object

```javascript
Factory.define("type", ConstructorFunction).defaults(defaultObjProperties);
```

The constructor function is optional

```javascript
Factory.define("type").defaults(defaultObjProperties);
```
## Build a defined Object

```javascript
var foo = Factory.build("foo");
```

## Build Lists
```javascript
var notes;
Factory.define("note", NoteConstructor).defaults({id:0, title: "Note #0"})
.sequence("id")
.sequence(function(i) { return "Note #" + i });
notes = Factory.buildList("note", 10);
```
