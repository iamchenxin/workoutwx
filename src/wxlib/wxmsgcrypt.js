// @flow
import { Prpcrypt } from './wxcrypto.js';
import type {WXParams} from './wxcrypto.js';
class WXBizMsgCrypt {
  prpCrypt: Prpcrypt;
  constructor(token: string, encodingAESKey: string, corpId: string) {
    this.prpCrypt = new Prpcrypt(token, encodingAESKey, corpId);
  }

  /*
*验证URL
*@param sMsgSignature: 签名串，对应URL参数的msg_signature
*@param sTimeStamp: 时间戳，对应URL参数的timestamp
*@param sNonce: 随机串，对应URL参数的nonce
*@param sEchoStr: 随机串，对应URL参数的echostr
*@param sReplyEchoStr: 解密之后的echostr，当return返回0时有效
*@return：成功0，失败返回对应的错误码
*/
  VerifyURL( wxParams: WXParams, relayEchoStr: string) {
    const {timestamp, nonce, echostr} = wxParams;
    const localSignature = this.prpCrypt.getSignature(timestamp, nonce, echostr);
    console.log(localSignature);
    console.log(wxParams.msg_signature);
  }
}

export {
  WXBizMsgCrypt
}
