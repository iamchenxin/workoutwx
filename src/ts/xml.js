// @flow
const xml2js = require('xml2js');
import { pFormat } from '../utils/tools.js';
import {parseWxBody} from '../wxlib/wxxml.js';

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

function ts(str) {
  xml2js.parseString(str, (err, result) => {
    console.log(pFormat(result));
  })
}

async function ts2(str) {
  const buf = Buffer.from(str, 'utf8');
  const buf2 = Buffer.alloc(0);
  const a = await parseWxBody(buf);
  console.log(pFormat(a));
}
ts2(rawBody).catch(e => {
  console.log(e);
});
console.log('-----------------------------');
