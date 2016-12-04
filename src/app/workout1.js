// @flow
//const util = require('util');
import { format } from '../utils/tools.js';
import type { Context } from 'koa';
import { getRawBody } from '../wxlib/wxbody.js';
import { toLog, wxCrypt} from './common.js';
import type {WxMsg, WxMsgBase, WxArticlesMsg } from '../wxlib/wxxml_compiler.js';

const atc: WxArticlesMsg = {
  MsgType: 'news',
  Articles: [{
    Title: '你来我家接我吧',
    Description: '这是女神与高富帅之间的对话',
    PicUrl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
    Url: 'http://nodeapi.cloudfoundry.com/',
  }],
};

async function workout1(ctx: Context, next: () => Promise<void>): Promise<void> {
//  let str = '';
  const wxBody = await getRawBody(ctx.req);
  try {
    const plainWx = await wxCrypt.decryptBody(ctx.query, wxBody);
    const timestamp = new Date().getTime();
    const restr = wxCrypt.buildBody(atc, {
      FromUserName: plainWx.ToUserName,
      ToUserName: plainWx.FromUserName,
      CreateTime: timestamp.toString(),
    });
    ctx.body = restr;
    record('wxbody', ctx.header, ctx.query, wxBody, plainWx);
  } catch (e) {
    record('wxbody2', ctx.header, ctx.query, wxBody, format(e));
    ctx.body = '';
  }

}

function record(fName, header, query, body, plainWx) {
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
  toLog(fName, str);
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
  workout1,
};
