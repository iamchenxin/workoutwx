// @flow
const koa = require('koa');
const router = require('koa-router')();
const app = new koa();
//const util = require('util');
const fs = require('./utils/fs.js').fs;
import { toTmpDir, format } from './utils/tools.js';
import type { Context } from 'koa';
import { wxverify } from './app/wxverify.js';
import { workout1 } from './app/workout1.js';
import { logDisplay } from './app/log.js';
const bodyParser = require('koa-bodyparser');

async function hi(ctx: Context, next) {
  ctx.body = 'hi!';
}

router
  .get('/work1', wxverify)
  .post('/work1', workout1)
  .get('/log', logDisplay)
  .get('/hi', hi);


//app.use(bodyParser())
app.use(async (ctx: Context, next: () => Promise<void>) => {
  const str = `
something wrong.
wxBody:
${format(ctx.request.body)}
-------------------
query:
${format(ctx.query)}
--------------------
headers:
${format(ctx.header)}
  `;
  fs.writeFile(toTmpDir('allb'), str);
  await next();
})
.use(router.routes());


app.listen('19001');
