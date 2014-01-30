factory-js
==========

Factory for building Javascript objects.

Include it to your project
=========
```html
<script src="https://raw2.github.com/HackerOfDreams/factory-js/master/dist/factory.min.js"></script>
```

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
var foo;
Factory.define("foo").defaults({name:"bar"});
foo = Factory.build("foo");
```
You can override properties of defined objects
```javascript
var foo;
Factory.define("foo").defaults({name:"bar"});
foo = Factory.build("foo", {name: "I'm foo"});
```
Note: If the property doesn't exist, it will be created

## Build Lists
```javascript
var notes;
Factory.define("note", NoteConstructor).defaults({id:0, title: "Note #0"})
.sequence("id")
.sequence("title", function(i) { return "Note #" + i });
notes = Factory.buildList("note", 10);
```

## Clean
Cleans the Factory's defined constructors

```javascript
Factory.clean();
```
