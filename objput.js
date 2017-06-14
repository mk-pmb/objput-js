/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function objPut(o, k, v, then) {
  o[k] = v;
  return (then ? then() : o);
}

objPut.cb = function (o, k) {
  return function (v, then) { return objPut(o, k, v, then); };
};

objPut.mthd = function (k, v, then) { return objPut(this, k, v, then); };

module.exports = objPut;
