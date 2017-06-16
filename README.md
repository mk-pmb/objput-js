
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
<!--#verbatim lncnt="40" -->
```javascript
// For demo purpose, use a pseudo-async function instead of real async
function counter(step, callback) {
  var n = (+counter.n || 0) + step;
  counter.n = n;
  callback(n);
}

var objPut = require('objput'), results = { store: objPut.mthd };
objPut(results, 'hello', 'world', function afterHello() {
  counter(0, objPut.cb(results, 'apple'));
  counter(2, objPut.cb(results, 'bacon'));
});
counter(3, objPut.cb(results, 'cheese'));

results.store('dango', '🍡', function afterDango() {
  counter(5, results.store.bind(results, 'eggs'));
});

objPut(results,
  [ null, 'herbs',  'water',  'kettle', null,   'boil',   'tea' ],
  [ 101,  102,      103,      104,      105,    106   ]);

expectEqual(results, {
  apple: 0,
  bacon: 2,
  cheese: 5,
  dango: '🍡',
  eggs: 10,
  hello: 'world',

  herbs: 102,
  water: 103,
  kettle: 104,
  boil: 106,
  tea: undefined,

  store: objPut.mthd,
});
```
<!--/include-->


API
---

For more details, you'll have to look at [the source](objput.js) for now.



<!--#toc stop="scan" -->




Known issues
------------

* needs more/better tests and docs



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
