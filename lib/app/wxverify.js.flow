// @flow
const route = require('koa-route');
//const util = require('util');
const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';
import type { Context } from 'koa';
const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';

async function wxverify(ctx: Context, next: Promise<mixed>): Promise<void> {
  try {
    const wc = new WXBizMsgCrypt(token, encodingAESKey, corpID);
    const echostr = wc.VerifyEchostr(ctx.query);
    ctx.body = echostr;
  } catch ( e ) {
    fs.writeFile(toTmpDir('vy'), format(e));
  }
}

export {
  wxverify
}
