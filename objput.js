/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var arSlc = Array.prototype.slice;

function zip(a, b, f) { return a.map(function (v, i) { return f(v, b[i]); }); }
function ifThis(x, t) { return (x === 'this' ? t : x); }

function core(d, k, v) {
  if (k === null) { return; }
  if (k === false) { return; }
  if (k === undefined) { return; }
  if (k && k.map) { return zip(k, v, core.bind(null, d)); }
  d[k] = v;
}

function objPut(d, k, v, cb) {
  core(d, k, v);
  if (cb) { return cb(); }
  return d;
}

objPut.put = objPut;
objPut.core = core;

objPut.cb = function (d, k) {
  return function (v, cb) { return objPut(ifThis(d, this), k, v, cb); };
};

objPut.mthd = function (k, v, cb) { return objPut(this, k, v, cb); };

function mkCbPicker(c) {
  if (c === +c) {
    if (c < 0) { return function (a) { return a[a.length + c]; }; }
    return function (a) { return a[c]; };
  }
  if (c === 'shift') { return function (a) { return a.shift(); }; }
  if (c === 'pop') { return function (a) { return a.pop(); }; }
}

objPut.args = function (d, k, n, cb) {
  if (n !== true) { n = (+n || 0); }
  var p = (cb && (!cb.apply) && mkCbPicker(cb)),
    s = (d || (n === true));
  return function () {
    var a = arguments, c = cb;
    if (s) { a = arSlc.call(a); }
    if (p) { c = p(a); }
    return objPut(ifThis(d, this), k, (n === true ? a : a[n]), c);
  };
};













module.exports = objPut;
