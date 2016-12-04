// @flow
const xml2js = require('xml2js');
import { WXXmlError } from '../utils/error.js';
import { format } from '../utils/tools.js';
const {mustNot, mustBe} = require('flow-dynamic').pro;
/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
const formatMessage = function(result) {
  var message = {};
  if (typeof result === 'object') {
    for (var key in result) {
      if (!(result[key] instanceof Array) || result[key].length === 0) {
        continue;
      }
      if (result[key].length === 1) {
        var val = result[key][0];
        if (typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        result[key].forEach(function(item) {
          message[key].push(formatMessage(item));
        });
      }
    }
    return message;
  } else {
    return result;
  }
};

function wxXml2json(wxXml: string|Buffer): Promise<Object> {
  return new Promise(function(resolve, reject) {
    const wxXmlStr = (typeof wxXml === 'string') ? wxXml : wxXml.toString('utf8');
    if (!wxXmlStr) { // more safe than only check ''. though we have static check.
      throw new WXXmlError(`body is wrong|empty.\n${format(wxXml)}`,
      'parseWxBody');
    }
    xml2js.parseString(wxXmlStr, {trim: true}, (err, result) => {
      if (err || result.xml == null) {
        return reject(new WXXmlError(`xml2js:\n${err.toString()}\n` +
        `wxBody:\n${wxXmlStr}`, 'parseWxBody'));
      }
      const wxjson = formatMessage(result.xml);
      resolve(wxjson);
    });
  });
}



export {
  wxXml2json,
};
