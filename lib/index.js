'use strict';

let hi = (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    ctx.body = 'hi!';
  });

  return function hi(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _tools = require('./utils/tools.js');

var _wxverify = require('./app/wxverify.js');

var _workout = require('./app/workout1.js');

var _log = require('./app/log.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const koa = require('koa');
const router = require('koa-router')();
const app = new koa();
//const util = require('util');
const fs = require('./utils/fs.js').fs;

const bodyParser = require('koa-bodyparser');

router.get('/work1', _wxverify.wxverify).post('/work1', _workout.workout1).get('/log', _log.logDisplay).get('/hi', hi);

app.use(bodyParser()).use(router.routes());

app.listen('19001');
//# sourceMappingURL=index.js.map
