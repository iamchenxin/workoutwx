// @flow

import { makeWxRes } from './common.js';
import type { Context } from 'koa';
import type { WxTextMsg } from '../wxlib/wxxml_compiler.js';

async function workout2(ctx: Context, next: () => Promise<void>): Promise<void> {
  const wxres = await makeWxRes(ctx);
  let msg: WxTextMsg = {
    Content: ` hello ${wxres.msgIn.FromUserName}`,
    MsgType: 'text',
  };
  wxres.send(msg);
  const delay = Math.floor(Math.random()*3000);
  setTimeout(() => {
    msg.Content = ' iam send again~';
    wxres.send(msg);
  }, delay);
}

export {
  workout2,
};
