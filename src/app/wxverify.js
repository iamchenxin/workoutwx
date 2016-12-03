// @flow
//const util = require('util');
import { format } from '../utils/tools.js';
import type { Context } from 'koa';
import { toLog, wxCrypt} from './common.js';

async function wxverify(ctx: Context, next: Promise<mixed>): Promise<void> {
  try {
    const echostr = wxCrypt.VerifyEchostr(ctx.query);
    ctx.body = echostr;
  } catch ( e ) {
    toLog('vy', format(e));
  }
}

export {
  wxverify
}
