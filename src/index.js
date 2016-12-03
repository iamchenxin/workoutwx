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

app.use(bodyParser())
.use(async (ctx: Context, next: () => Promise<void>) => {
  fs.writeFile(toTmpDir('allb'), format(ctx.request.body));
  await next();
})
.use(router.routes());


app.listen('19001');
