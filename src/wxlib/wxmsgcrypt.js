// @flow
import { Prpcrypt } from './wxcrypto.js';
import type {WXParams} from './wxcrypto.js';
import {wxXml2json} from '../wxlib/wxxml.js';
const {mustNot, mustBe, isString} = require('flow-dynamic').pro;
import { format } from '../utils/tools.js';
import { WXCrypToError } from '../utils/error.js';
//import { getRawBody } from './wxbody.js';
import { genWxMsg } from './wxxml_compiler.js';
import type { WxMsg, WxMsgBase } from './wxxml_compiler.js';
const crypto = require('crypto');

type WXJSON = Object;

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
    const {timestamp, nonce} = wxParams;
    const echostr = wxParams.echostr ? wxParams.echostr : '';
    const localSignature = this.prpCrypt.getSignature(timestamp, nonce, echostr);
    mustBe(true, localSignature === wxParams.msg_signature,
    new WXCrypToError(`illegal msg from wechat server:
    \nwechat get:
    \n${format(wxParams)}
    \nlocalSignature:
    \n${format(localSignature)}`, 'VerifyEchostr'));

    // It is a legel get, decipher the params and return echostr
    // The echostr from wechat's get is a ciphered data.
    const plainMsg = this.prpCrypt.decrypt(echostr);
    mustBe(true, plainMsg.id === this.prpCrypt.corpId, new WXCrypToError(
      `The corpId is not equal to ours.\nplainMsg:\n${format(plainMsg)}`,
      'VerifyEchostr'
    ));
    return plainMsg.message; // the message is deciphered echostr.
  }

  async decryptBody( wxQuery: WXParams, xmlBody: Buffer): Promise<WXJSON> {
    // the raw body of wechat is a xml
    try {
      const body = await wxXml2json(xmlBody);
      const encryptData = isString(body.Encrypt);
      const signature = this.prpCrypt.getSignature(wxQuery.timestamp,
        wxQuery.nonce, encryptData);
      mustBe(true, signature == wxQuery.msg_signature, 'Invalid signature');
      // ok, it is the real post from tencent.
      // the content xml of wechat
      const msgXml = this.prpCrypt.decrypt(encryptData);
      const msg = await wxXml2json(msgXml.message);
      mustBe(true, msgXml.id == msg.ToUserName, 'not the same id!');
      return msg;
    } catch (e) {
      let errMsg = `Invalid wechat post:\nQuery:\n${format(wxQuery)}\n` +
        `Body:\n${xmlBody.toString()}\n`;
      if ( !(e instanceof WXCrypToError) ) {
        errMsg += `\n${format(e)}`;
      }
      throw new WXCrypToError(errMsg, 'decryptBody');
    }
  }

  // build a wechat's xml body from a json style data.
  buildBody(wxMsg: WxMsg, msgBase: WxMsgBase): string {
    try {
      const nonce = getRandomStr(16);
      const timeStamp = msgBase.CreateTime;

      const wxMsgXml = genWxMsg(wxMsg, msgBase);

      const cipheredMsg = this.prpCrypt.encrypt(wxMsgXml);
      const signature = this.prpCrypt.getSignature(timeStamp,
        nonce, cipheredMsg);
      const wxBody =
        '<xml>' +
        `<Encrypt><![CDATA[${cipheredMsg}]]></Encrypt>` +
        `<MsgSignature><![CDATA[${signature}]]></MsgSignature>` +
        `<TimeStamp>${timeStamp}</TimeStamp>` +
        `<Nonce><![CDATA[${nonce}]]></Nonce>` +
        '</xml>';
      return wxBody;
    } catch (e) {
      throw new WXCrypToError(`${format(e)}`, 'buildBody');
    }
  }
}

function getRandomStr(length: number): string {
  let rt = '';
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    const ranInt = Math.floor(Math.random() * pool.length);
    //console.log(pool.length);
    rt += pool[ranInt];
  }
  return rt;
}

export {
  WXBizMsgCrypt,
};
