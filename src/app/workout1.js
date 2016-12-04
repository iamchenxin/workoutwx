// @flow
//const util = require('util');
import { format } from '../utils/tools.js';
import type { Context } from 'koa';
import { getRawBody } from '../wxlib/wxbody.js';
import { toLog, wxCrypt} from './common.js';

async function workout1(ctx: Context, next: () => Promise<void>): Promise<void> {
//  let str = '';
  const wxBody = await getRawBody(ctx.req);
  const plainWx = await wxCrypt.decryptBody(ctx.query, wxBody);
  record(ctx.header, ctx.query, wxBody, plainWx);
}

function record(header, query, body, plainWx) {
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
  toLog('wxbody', str);
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
