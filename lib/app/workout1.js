'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workout1 = undefined;

let workout1 = (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const wc = new _wxmsgcrypt.WXBizMsgCrypt(token, encodingAESKey, corpID);
    let str = '';
    if (typeof ctx.request.body == 'string' || ctx.request.body instanceof Buffer) {
      const wxBody = ctx.request.body;
      const plainWx = wc.decryptMsg(ctx.query, ctx.request.body);
      str = `
wxBody:
${ wxBody }
-------------------
plainWx:
${ (0, _tools.format)(plainWx) }
    `;
    } else {
      str = `
something wrong.
wxBody:
${ (0, _tools.format)(ctx.request.body) }
    `;
    }
    fs.writeFile((0, _tools.toTmpDir)('wxbody'), str);
    //  ctx.
  });

  return function workout1(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _tools = require('../utils/tools.js');

var _wxmsgcrypt = require('../wxlib/wxmsgcrypt.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//const util = require('util');
const fs = require('../utils/fs.js').fs;

const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID } = config.wechat;

exports.workout1 = workout1;
//# sourceMappingURL=workout1.js.map
