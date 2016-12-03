'use strict';

let ts2 = (() => {
  var _ref = _asyncToGenerator(function* (str) {
    const buf = Buffer.from(str, 'utf8');
    const buf2 = Buffer.alloc(0);
    const a = yield (0, _wxxml.parseWxBody)(buf);
    console.log((0, _tools.pFormat)(a));
  });

  return function ts2(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _tools = require('../utils/tools.js');

var _wxxml = require('../wxlib/wxxml.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const xml2js = require('xml2js');


const xmlStr = `
<item id="123" type="common">
  <title>Item Title</title>
  <description>Description of this item.</description>
  (text)
</item>
`;

const xmlStr2 = '<?xml version="1.0" encoding="UTF-8"?>' + '<root>' + '<child foo="bar">' + '<grandchild baz="fizbuzz">grandchild content</grandchild>' + '</child>' + '<sibling>with content!</sibling>' + '</root>';

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
    console.log((0, _tools.pFormat)(result));
  });
}

ts2(rawBody).catch(e => {
  console.log(e);
});
console.log('-----------------------------');
//# sourceMappingURL=xml.js.map
