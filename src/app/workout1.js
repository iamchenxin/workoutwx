// @flow
//const util = require('util');
const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';
import type { Context } from 'koa';
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';
const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;

async function workout1(ctx: Context, next: Promise<mixed>): Promise<void> {
  const wc = new WXBizMsgCrypt(token, encodingAESKey, corpID);
  let str = '';
  if ( typeof ctx.request.body == 'string' || ctx.request.body instanceof Buffer) {
    const wxBody = ctx.request.body;
    const plainWx = wc.decryptMsg(ctx.query, ctx.request.body);
    str = `
wxBody:
${wxBody}
-------------------
plainWx:
${format(plainWx)}
    `;
  } else {
    const plainWx = wc.decryptMsg(ctx.query, ctx.request.body);
    str = `
something wrong.
wxBody:
${format(ctx.request.body)}
-------------------
plainWx:
${format(plainWx)}
    `
  }
  fs.writeFile(toTmpDir('wxbody'), str);
//  ctx.
}

export {
  workout1
}
