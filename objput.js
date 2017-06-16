/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function zip(a, b, f) { return a.map(function (v, i) { return f(v, b[i]); }); }

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

objPut.core = core;
objPut.cb = function (o, k) { return objPut.bind(null, o, k); };
objPut.mthd = function (k, v, cb) { return objPut(this, k, v, cb); };

module.exports = objPut;
