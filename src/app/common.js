// @flow

const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';
const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';

function toLog(fName: string, data: string|Buffer): Promise<void> {
  const str: string = (typeof data === 'string')?data:data.toString();
  return fs.writeFile(toTmpDir(fName), str);
}

// the require should only execute a file once.
const wxCrypt = new WXBizMsgCrypt(token, encodingAESKey, corpID);

export {
  toLog,
  wxCrypt,
};
