// @flow
//const util = require('util');
const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';
import type { Context } from 'koa';
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';
const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
import { getRawBody } from '../wxlib/wxbody.js';

async function workout1(ctx: Context, next: () => Promise<void>): Promise<void> {
  const wc = new WXBizMsgCrypt(token, encodingAESKey, corpID);
  let str = '';
  const wxBody = await getRawBody(ctx.req);

  const plainWx = wc.decryptMsg(ctx.query, wxBody);
  record(ctx.header,ctx.query,wxBody,plainWx);
}

function record(header,query,body,plainWx) {
  const str = `
header:
${format(header)}
-------------------
query:
${format(query)}
--------------------
body:
${format(body.toString())}
plainWx:
${format(plainWx)}
-------------------
`;
  fs.writeFile(toTmpDir('wxbody'), str);
}
    /*
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
-------------------
query:
${format(ctx.query)}
--------------------
headers:
${format(ctx.header)}
    `
  }
  fs.writeFile(toTmpDir('wxbody'), str);
//  ctx.
}
*/
export {
  workout1
}
