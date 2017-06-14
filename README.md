
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
<!--#verbatim lncnt="29" -->
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

expectEqual(results, {
  apple: 0,
  bacon: 2,
  cheese: 5,
  dango: '🍡',
  eggs: 10,
  hello: 'world',
  store: objPut.mthd,
});
```
<!--/include-->


API
---

<!--#include file="objput.js" start="" code="javascript" -->
<!--#verbatim lncnt="14" -->
```javascript
function objPut(o, k, v, then) {
  o[k] = v;
  return (then ? then() : o);
}

objPut.cb = function (o, k) {
  return function (v, then) { return objPut(o, k, v, then); };
};

objPut.mthd = function (k, v, then) { return objPut(this, k, v, then); };

module.exports = objPut;
```
<!--/include-->



<!--#toc stop="scan" -->



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
