'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWxBody = undefined;

var _error = require('../utils/error.js');

var _tools = require('../utils/tools.js');

const xml2js = require('xml2js');

const { mustNot, mustBe } = require('flow-dynamic').pro;
/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
const formatMessage = function (result) {
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
        result[key].forEach(function (item) {
          message[key].push(formatMessage(item));
        });
      }
    }
    return message;
  } else {
    return result;
  }
};

function parseWxBody(wxBody) {
  return new Promise(function (resolve, reject) {
    const wxXmlStr = typeof wxBody === 'string' ? wxBody : wxBody.toString('utf8');
    if (!wxXmlStr) {
      // more safe than only check ''. though we have static check.
      throw new _error.WXXmlError(`body is wrong|empty.\n${ (0, _tools.format)(wxBody) }`, 'parseWxBody');
    }
    xml2js.parseString(wxXmlStr, { trim: true }, (err, result) => {
      if (err || result.xml == null) {
        return reject(new _error.WXXmlError(`xml2js:\n${ err.toString() }\n` + `wxBody:\n${ wxXmlStr }`, 'parseWxBody'));
      }
      const wxjson = formatMessage(result.xml);
      resolve(wxjson);
    });
  });
}

exports.parseWxBody = parseWxBody;
//# sourceMappingURL=wxxml.js.map
