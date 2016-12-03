'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WXBizMsgCrypt = undefined;

var _wxcrypto = require('./wxcrypto.js');

var _tools = require('../utils/tools.js');

var _error = require('../utils/error.js');

const { mustNot, mustBe } = require('flow-dynamic').pro;

class WXBizMsgCrypt {
  constructor(token, encodingAESKey, corpId) {
    this.prpCrypt = new _wxcrypto.Prpcrypt(token, encodingAESKey, corpId);
  }

  /*
  * 验证URL
  * If it is not a legal msg, throw error.
  *@wxParams the get params of wechat
  *@return plain echostr
  */
  VerifyEchostr(wxParams) {
    const { timestamp, nonce, echostr } = wxParams;
    const localSignature = this.prpCrypt.getSignature(timestamp, nonce, echostr);
    mustBe(true, localSignature === wxParams.msg_signature, new _error.WXCrypToError(`illegal msg from wechat server:
    \nwechat get:
    \n${ (0, _tools.format)(wxParams) }
    \nlocalSignature:
    \n${ (0, _tools.format)(localSignature) }`, 'VerifyEchostr'));

    // It is a legel get, decipher the params and return echostr
    // The echostr from wechat's get is a ciphered data.
    const plainMsg = this.prpCrypt.decrypt(wxParams.echostr);
    mustBe(true, plainMsg.id === this.prpCrypt.corpId, new _error.WXCrypToError(`The corpId is not equal to ours.\nplainMsg:\n${ (0, _tools.format)(plainMsg) }`, 'VerifyEchostr'));
    return plainMsg.message; // the message is deciphered echostr.
  }

  decryptMsg(wxParams, wxPost) {}
}

exports.WXBizMsgCrypt = WXBizMsgCrypt;
//# sourceMappingURL=wxmsgcrypt.js.map
