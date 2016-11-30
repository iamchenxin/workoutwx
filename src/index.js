// @flow
const koa = require('koa');
const route = require('koa-route');
const app = new koa();
const util = require('util');
import type { Context } from 'koa';

app.use(route.get('/hi', async (ctx:Context, next) => {
  ctx.ts = 1;
//  ctx.ts = '1';

  ctx.body = 'hi<br/> <div>';
  await next();
  if ( typeof ctx.body != 'string') {throw 'e';}
  ctx.body += '<br/>iam hiend </div>';
  //const a:number = ctx.ts;
}));
app.use(route.get('/',async (ctx, next) => {

  ctx.body = 'iam root!';
  await next();
  ctx.body += '<br/>rootend! ';
}));

app.use(async (ctx, next) => {

  for (var key in ctx) {
    console.log(`${key}`);
  //  console.log(util.inspect(ctx[key]));
  }
  if ( typeof ctx.body != 'string') {throw 'e';}
  ctx.body = ctx.body ? `${ctx.body}\n~~~test~~~~\n` : ctx.body;
});

app.listen('19001');
