// @flow

const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';
const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';
import type { Context } from 'koa';

import { getRawBody } from '../wxlib/wxbody.js';
import type {WxMsg, WxMsgBase, WxArticlesMsg } from '../wxlib/wxxml_compiler.js';

function toLog(fName: string, data: string|Buffer): Promise<void> {
  const str: string = (typeof data === 'string')?data:data.toString();
  return fs.writeFile(toTmpDir(fName), str);
}

// the require should only execute a file once.
const wxCrypt = new WXBizMsgCrypt(token, encodingAESKey, corpID);

type WxRes = {
  msgIn: Object,
  send: (msg: WxMsg) => void,
};

async function makeWxRes(ctx: Context) {
  const wxBody = await getRawBody(ctx.req);
  const plainWx = await wxCrypt.decryptBody(ctx.query, wxBody);
  const timestamp = new Date().getTime();
  const msgBase: WxMsgBase = {
    FromUserName: plainWx.ToUserName,
    ToUserName: plainWx.FromUserName,
    CreateTime: timestamp.toString(),
  };

  return {
    msgIn: plainWx,
    send: (msg: WxMsg) => {
      const str = wxCrypt.buildBody(msg, msgBase);
      ctx.body = str;
    },
  };
}

export {
  toLog,
  wxCrypt,
  makeWxRes,
};
