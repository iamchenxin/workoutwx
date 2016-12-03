'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wxverify = undefined;

let wxverify = (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    try {
      const wc = new _wxmsgcrypt.WXBizMsgCrypt(token, encodingAESKey, corpID);
      const echostr = wc.VerifyEchostr(ctx.query);
      ctx.body = echostr;
    } catch (e) {
      fs.writeFile((0, _tools.toTmpDir)('vy'), (0, _tools.format)(e));
    }
  });

  return function wxverify(_x, _x2) {
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
exports.wxverify = wxverify;
//# sourceMappingURL=wxverify.js.map
