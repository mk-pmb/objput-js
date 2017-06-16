
<!--#echo json="package.json" key="name" underline="=" -->
objput
======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Put that value in that slot of that object, then call that callback.
<!--/#echo -->


Usage
-----

from [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="81" -->
```javascript
var objPut = require('objput'), libTest = require('./lib_test'), myCb,
  counter = libTest.makePseudoAsyncCounter(), // -> counter(step, callback)
  results = { store: objPut.mthd },
  bad = new Error('Forgot my towel!'),
  test = libTest.accum(results);

// Basic use: destObj, destKey, value[, callback]
objPut(results, 'hello', 'world', function afterHello() {
  // update and verify our expectation:
  test.upd({ hello: 'world' });
  counter(0, objPut.cb(results, 'apple'));
  counter(2, objPut.cb(results, 'bacon'));
});
// check whether afterHello was called:
test.upd({ apple: 0, bacon: 2 });

// Easily create callbacks with .cb:
myCb = objPut.cb(results, 'cheese');
counter(3, myCb);
test.upd({ cheese: 5 });

// The "store" property from the object literal is a method:
myCb = results.store.bind(results, 'eggs');
results.store('dango', '🍡', function afterDango() {
  counter(5, myCb);
});
test.upd({ dango: '🍡', eggs: 10 });

// Using an Array as destKey spreads an Array-like value
// to assign multiple keys in destObj:
objPut(results,
  [ null, 'herbs',  'water',  'kettle', null,   'boil',   'tea' ],
  [ 101,  102,      103,      104,      105,    106   ]);
test.upd({ herbs: 102, water: 103, kettle: 104,
  // 105 was skipped because it had no target slot.
  boil: 106, tea: undefined });

// .args makes a callback that stores one of its arguments:
myCb = objPut.args(results, 'arg0', 0);
myCb('first', 'second', 'third');
test.upd({ arg0: 'first' });

myCb = objPut.args(results, 'arg2', 2, function followUp() {
  test.upd({ arg2: 'THIRD' });
  results.chainedCallback = 'supported';
});
myCb('FIRST', 'SECOND', 'THIRD');
test.upd({ chainedCallback: 'supported' });

// Set n=true to collect all arguments:
myCb = objPut.args(results, 'allArgs', true);
myCb('first', 'second', 'third');
test.upd({ allArgs: [ 'first', 'second', 'third' ] });

// To use one of the arguments as the callback, put its number…
function nextCallback() { results.nextCb = 'called'; }
myCb = objPut.args(results,
  [ 'hadError', 'data', null, 'fourth', 'fifth' ],  // spread the value
  true,   // use ALL arguments as value
  -1);    // use last argument as callback
myCb(null, 'foo',  '(ignored)',  nextCallback);
test.upd({ hadError: null, data: 'foo',
  // no slot for '(ignored)'
  fourth: nextCallback, fifth: undefined, nextCb: 'called' });

// … or "pop" or "shift" (useful for async.waterfall):
function popCallback() { results.popCb = 'popped'; }
myCb = objPut.args(results,
  [ 'hadError', null,     'data', 'fourth',   'fifth'  ], true, 'pop');
myCb(bad,       '(ign)',  'bar',  popCallback);
test.upd({ hadError: bad,  // .args doesn't assume error-first convention,
  data: 'bar',             // it just stores whatever is there.
  fourth: undefined, fifth: undefined, popCb: 'popped' });

function shiftCallback() { results.shiftCb = 'shifted'; }
myCb = objPut.args(results, 'allArgs', true, 'shift');
myCb(shiftCallback, 'not ignored', 'qux', popCallback);
test.upd({ shiftCb: 'shifted',
  allArgs: [ 'not ignored', 'qux', popCallback ] });
```
<!--/include-->



<!--#toc stop="scan" -->


API
---

For more details, you'll have to look at [the source](objput.js) for now.




Known issues
------------

* needs more/better tests and docs



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
