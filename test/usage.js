/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('equal-pmb');

(function readmeDemo(expectEqual) {
  //#u
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
  //#r
}(eq));


console.log("+OK usage test passed.");    //= "+OK usage test passed."
