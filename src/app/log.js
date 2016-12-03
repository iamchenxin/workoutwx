const fs = require('../utils/fs.js').fs;
import { toTmpDir, format } from '../utils/tools.js';
import type { Context } from 'koa';

async function logDisplay(ctx: Context, next: Promise<mixed>): Promise<void> {
  if( typeof ctx.query.l === 'string') {
    const l = ctx.query.l;
    let logStr = '';
    try {
      logStr = await fs.readFile(toTmpDir(l));
    } catch (e) {
      logStr = `not log for /${l}`;
    }
    ctx.body = logStr;
  }
}

export {
  logDisplay
}
