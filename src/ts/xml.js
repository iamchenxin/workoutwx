// @flow
const xml2js = require('xml2js');
import { pFormat } from '../utils/tools.js';
import {wxXml2json} from '../wxlib/wxxml.js';
import {Prpcrypt} from '../wxlib/wxcrypto.js';
const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
const wxcrypt = new Prpcrypt(token, encodingAESKey, corpID);
import { toLog, wxCrypt} from '../app/common.js';

const xmlStr = `
<item id="123" type="common">
  <title>Item Title</title>
  <description>Description of this item.</description>
  (text)
</item>
`;

const xmlStr2 =  '<?xml version="1.0" encoding="UTF-8"?>' +
'<root>' +
   '<child foo="bar">' +
       '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
   '</child>' +
   '<sibling>with content!</sibling>' +
'</root>';

/*
const rawBody = "<xml><ToUserName><![CDATA[nvshen]]></ToUserName>\
      <FromUserName><![CDATA[diaosi]]></FromUserName>\
      <CreateTime>1362161914</CreateTime>\
      <MsgType><![CDATA[location]]></MsgType>\
      <Location_X>30.283878</Location_X>\
      <Location_Y>120.063370</Location_Y>\
      <Scale>15</Scale>\
      <Label><![CDATA[]]></Label>\
      <MsgId>5850440872586764820</MsgId>\
      </xml>";
      */

const wxQuery = { msg_signature: '7ea7dc07282f95249274f5ff60583a7f22ca44c7',
  timestamp: '1480757981',
  nonce: '1866900886' };
const wxXml = '<xml><ToUserName><![CDATA[wx018856cb62d8ad6f]]></ToUserName>\n<Encrypt><![CDATA[y/DXTAKs6XHHzhWZaf67GrHzW9sUXcFKq56s1tHCu1f7uSue/ON2PIkTiOVRkppnUdTrBbyiMStkbAn25Lyv77MpbCph3ri7FDp4KA7oLrsc5kRAA74yfY3EQh2twIyXuhCkGeDQ2Vri1biQU1Ts123GfqiQOb6LwAMqunIv0YUhOXMJ6s5bQ0Eit9EgjrfODzQMSCoNNoIcjeUhKF8IGqO0VPI5yuv0ahFRC5BNChu8uiBniprHR3RxiIT7LpQsmFpZBcQyM/JSjMQ+K/wplzH8rUPYOvnc/ghXx8dhdmldd/4Bd1tcWRmwxvOOh9zHSmMsuIwq6JTyw+kgWZR2KYOGaPG3n1vhLVuIpm+Nuwo/HzxGBG8zWLUEVh7luOQ4W7LdSuPQdasZm4n7YRFCCudxQhnb6XS8v0ZpXBMw3KWwNA3Y2SUq/9HuUx/nsbGap20bnHjLP6VmVhe2xsEaQw==]]></Encrypt>\n<AgentID><![CDATA[1]]></AgentID>\n</xml>';
function ts(str) {
  xml2js.parseString(str, (err, result) => {
    console.log(pFormat(result));
  });
}

async function ts2(str) {
  const buf = Buffer.from(str, 'utf8');
  const buf2 = Buffer.alloc(0);
  const a = await wxXml2json(buf);
  console.log(pFormat(a));
}

async function ts3(str) {
  //const buf = Buffer.from(str, 'utf8');
  console.log(pFormat(str));
  console.log('--------------------------');
  const rt = await wxXml2json(str);

  console.log(pFormat(rt));
  console.log('--------------------------plain ===');
  const plain = wxcrypt.decrypt(rt.Encrypt);
  console.log(pFormat(plain));
  console.log('--------------------------');
  const pxl = await wxXml2json(plain.message);
  console.log(pFormat(pxl));
}

async function ts4() {
  const msg = await wxCrypt.decryptBody(wxQuery, Buffer.from(wxXml));
  console.log(pFormat(msg));
}

ts3(wxXml).catch(e => {
  console.log(e);
});
console.log('-----------------------------');
