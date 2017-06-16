/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');
var EX = {}, eq = require('equal-pmb');


EX.makePseudoAsyncCounter = function (n) {
  n = (+n || 0);
  return function counter(step, callback) {
    n += step;
    callback(n);
  };
};


EX.accum = function (actual) {
  var expt = Object.assign({}, actual),
    test = { actual: actual, expected: expt };

  test.upd = function (upd) {
    Object.assign(expt, upd);
    eq(actual, expt);
  };

  return test;
};











module.exports = EX;
