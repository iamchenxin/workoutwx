// @flow
import { Prpcrypt } from './wxcrypto.js';
import type {WXParams} from './wxcrypto.js';
const {mustNot, mustBe} = require('flow-dynamic').pro;
import { format } from '../utils/tools.js';
import { WXCrypToError } from '../utils/error.js';
class WXBizMsgCrypt {
  prpCrypt: Prpcrypt;
  constructor(token: string, encodingAESKey: string, corpId: string) {
    this.prpCrypt = new Prpcrypt(token, encodingAESKey, corpId);
  }

  /*
  * 验证URL
  * If it is not a legal msg, throw error.
  *@wxParams the get params of wechat
  *@return plain echostr
  */
  VerifyEchostr( wxParams: WXParams ): string {
    const {timestamp, nonce, echostr} = wxParams;
    const localSignature = this.prpCrypt.getSignature(timestamp, nonce, echostr);
    mustBe(true, localSignature === wxParams.msg_signature,
    new WXCrypToError(`illegal msg from wechat server:
    \nwechat get:
    \n${format(wxParams)}
    \nlocalSignature:
    \n${format(localSignature)}`, 'VerifyEchostr'));

    // It is a legel get, decipher the params and return echostr
    // The echostr from wechat's get is a ciphered data.
    const plainMsg = this.prpCrypt.decrypt(wxParams.echostr);
    mustBe(true, plainMsg.id === this.prpCrypt.corpId , new WXCrypToError(
      `The corpId is not equal to ours.\nplainMsg:\n${format(plainMsg)}`,
      'VerifyEchostr'
    ));
    return plainMsg.message; // the message is deciphered echostr.
  }

  decryptMsg( wxParams: WXParams, wxPost: Buffer) {

  }
}

export {
  WXBizMsgCrypt
}
