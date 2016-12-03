'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

app.use(route.get('/hi', (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    ctx.ts = 1;
    //  ctx.ts = '1';

    ctx.body = 'hi<br/> <div>';
    yield next();
    console.log(typeof ctx.body);
    if (typeof ctx.body != 'string') {
      throw 'e';
    }
    ctx.body += '<br/>iam hiend </div>';
    //const a:number = ctx.ts;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})()));
app.use(route.get('/', (() => {
  var _ref2 = _asyncToGenerator(function* (ctx, next) {
    const content = `
  ${ format(ctx.headers) }
  \n
  ${ format(ctx.query) }`;
    ctx.body = content;
    fs.writeFile(toTmpDir('wxyz'), content);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})()));
app.use(route.get('/wxyz', (() => {
  var _ref3 = _asyncToGenerator(function* (ctx, next) {
    const str = yield fs.readFile(toTmpDir('wxyz'));
    ctx.body = str;
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})()));

app.use(route.get('/hd', (() => {
  var _ref4 = _asyncToGenerator(function* (ctx, next) {
    console.log(typeof ctx.header);
    console.log(ctx.header);
    ctx.cookies.set('hello', 'iam cookies');
    ctx.body = ctx.header;
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})()));

app.use(route.post('/hd2', (() => {
  var _ref5 = _asyncToGenerator(function* (ctx, next) {
    console.log(typeof ctx.header);
    console.log(ctx.header);
    ctx.body = ctx.header;
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})()));

app.use(route.get('/th', (() => {
  var _ref6 = _asyncToGenerator(function* (ctx, next) {
    ctx.throw(400, 400, { aa: 'aaa' });
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})()));
//# sourceMappingURL=_old.js.map
