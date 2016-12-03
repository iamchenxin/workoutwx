app.use(route.get('/hi', async (ctx: Context, next) => {
  ctx.ts = 1;
//  ctx.ts = '1';

  ctx.body = 'hi<br/> <div>';
  await next();
  console.log(typeof ctx.body);
  if ( typeof ctx.body != 'string') {throw 'e';}
  ctx.body += '<br/>iam hiend </div>';
  //const a:number = ctx.ts;
}));
app.use(route.get('/', async (ctx: Context, next) => {
  const content = `
  ${format(ctx.headers)}
  \n
  ${format(ctx.query)}`;
  ctx.body = content;
  fs.writeFile(toTmpDir('wxyz'), content);
}));
app.use(route.get('/wxyz', async (ctx: Context, next) => {
  const str = await fs.readFile(toTmpDir('wxyz'));
  ctx.body = str;
}));

app.use( route.get('/hd', async(ctx: Context, next) => {
  console.log(typeof ctx.header);
  console.log(ctx.header);
  ctx.cookies.set('hello', 'iam cookies');
  ctx.body = ctx.header;
}));

app.use( route.post('/hd2', async(ctx: Context, next) => {
  console.log(typeof ctx.header);
  console.log(ctx.header);
  ctx.body = ctx.header;
}));

app.use( route.get('/th', async(ctx: Context, next) => {
  ctx.throw(400, 400, {aa:'aaa'});
}));
