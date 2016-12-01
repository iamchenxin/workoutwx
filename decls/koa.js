// @flow
// Its a bit different from Typescript, i thought something in d.ts is typo.
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/types-2.0/koa/index.d.ts#L158
// So i retyped this from source-code of koa2.
// import type { Server } from 'http'; //Currently, import type doesnt work well?
declare module 'koa' {
  // Copy from flow/lib/node.js#L820
  declare class Server extends net$Server {
    listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server,
    listen(path: string, callback?: Function): Server,
    listen(handle: Object, callback?: Function): Server,
    close(callback?: Function): Server,
    maxHeadersCount: number,
    setTimeout(msecs: number, callback: Function): Server,
    timeout: number,
  }

  declare type JSON = | string | number | boolean | null | JSONObject | JSONArray;
  declare type JSONObject = { [key: string]: JSON };
  declare type JSONArray = Array<JSON>;

  declare type SimpleHeader = {
    'set-cookie': Array<string>|void,
    [key: string]: string|void,
  };

  declare type RequestJSON = {
    'method': string,
    'url': string,
    'header': Object,
  };
  declare type RequestInspect = void|RequestJSON;
  declare type Request = {
    app: Application,
    req: http$IncomingMessage,
    res: http$ServerResponse,
    ctx: Context,
    response: Response,

    fresh: boolean,
    header: {[key: string]: mixed},
    headers: {[key: string]: mixed}, // alias as header
    host: string,
    hostname: string,
    href: string,
    idempotent: boolean,
    ip: string,
    ips: string[],
    method: string,
    origin: string,
    originalUrl: string,
    path: string,
    protocol: string,
    query: {[key: string]: mixed},
    querystring: string,
    search: string,
    secure: boolean,
    socket: net$Socket,
    stale: boolean,
    subdomains: string[],
    type: string,
    url: string,

    charset: string,
    length: number|void,

//  Those functions comes from https://github.com/jshttp/accepts/blob/master/index.js
//  request.js$L445
//  But where is the void come from ????
//  Seems from the unit test, it returns a string[]string|false, without `void`
//  https://github.com/jshttp/accepts/blob/master/test/type.js
    accepts: ( () => string[] )& // return the old value.
    ((arg: string[]) => void|string|false)&
    ((...args: string[]) => void|string|false),

//  https://github.com/jshttp/accepts/blob/master/index.js#L153
//  https://github.com/jshttp/accepts/blob/master/test/charset.js
    acceptsCharsets: ( () => string[] )&
    ( (arg: string[]) => void|string|false)&
    ( (...args: string[]) => void|string|false ),

//  https://github.com/jshttp/accepts/blob/master/index.js#L119
//  https://github.com/jshttp/accepts/blob/master/test/encoding.js
    acceptsEncodings: ( () => string[] )&
    ( (arg: string[]) => void|string|false)&
    ( (...args: string[]) => void|string|false ),

//  https://github.com/jshttp/accepts/blob/master/index.js#L185
//  https://github.com/jshttp/accepts/blob/master/test/language.js
    acceptsLanguages: ( () => string[] )&
    ( (arg: string[]) => void|string|false)&
    ( (...args: string[]) => void|string|false ),

    get: (field: string) => string,

/* https://github.com/jshttp/type-is/blob/master/test/test.js
* Check if the incoming request contains the "Content-Type"
* header field, and it contains any of the give mime `type`s.
* If there is no request body, `null` is returned.
* If there is no content type, `false` is returned.
* Otherwise, it returns the first `type` that matches.
*/
    is: ( () => string )& // should return the mime type
    ( (arg: string[]) => null|false|string)&
    ( (...args: string[]) => null|false|string ),

    toJSON: () => RequestJSON,
    inspect: () => RequestInspect,
  };

  declare type ResponseJSON = {
    'status': mixed,
    'message': mixed,
    'header': mixed,
  };
  declare type ResponseInspect = {
    'status': mixed,
    'message': mixed,
    'header': mixed,
    'body': mixed,
  };
  declare type Response = {
    app: Application,
    req: http$IncomingMessage,
    res: http$ServerResponse,
    ctx: Context,
    request: Request,

    body: mixed, // response#L125 getter {String|Buffer|Object|Stream}
    etag: string,
    header: {[key: string]: mixed},
    headers: {[key: string]: mixed}, // alias as header
    headerSent: boolean,
    // can be set with string|Date, but get with Date.
    // set lastModified(v: string|Date), // 0.36 doesn't support this.
    lastModified: Date,
    message: string,
    socket: net$Socket,
    status: number,
    type: string,
    writable: boolean,

    // charset: string,  // doesn't find in response.js
    length: number|void,

    append: (field: string, val: string | string[]) => void,
    attachment: (filename?: string) => void,
    get: (field: string) => string,
    // https://github.com/jshttp/type-is/blob/master/test/test.js
    // https://github.com/koajs/koa/blob/v2.x/lib/response.js#L382
    is: ( () => string )& // should return the mime type
    ( (arg: string[]) => false|string)&
    ( (...args: string[]) => false|string ),
    redirect: (url: string, alt?: string) => void,
    remove: (field: string) => void,
    // https://github.com/koajs/koa/blob/v2.x/lib/response.js#L418
    set: ((field: string, val: string | string[]) => void)&
      ((field: {[key: string]: string | string[]}) => void),

    vary: (field: string) => void,

    // https://github.com/koajs/koa/blob/v2.x/lib/response.js#L519
    toJSON(): ResponseJSON,
    inspect(): ResponseInspect,
  }

  declare type ContextJSON = {
    request: RequestJSON,
    response: ResponseJSON,
    app: ApplicationJSON,
    originalUrl: string,
    req: '<original node req>',
    res: '<original node res>',
    socket: '<original node socket>',
  };
  // The default props of context come from two files
  // `application.createContext` & `context.js`
  declare type Context = {
    accept: $PropertyType<Request, 'accept'>,
    app: Application,
    cookies: Object, // https://github.com/pillarjs/cookies
    name?: string, // ?
    originalUrl: string,
    req: http$IncomingMessage,
    request: Request,
    res: http$ServerResponse,
    respond?: boolean, // allow bypassing koa application.js#L193
    response: Response,
    state: Object,

    // context.js#L55
    assert: (test: mixed, status: number, message: string, opts: mixed) => void,
    // context.js#L107
    // if (!(err instanceof Error)) err = new Error(`non-error thrown: ${err}`);
    onerror: (err?: mixed) => void,
    // context.js#L70
    throw: ( arg1: string|number|Error, arg2: string|number|Error,
      opts: Object) => void,
    toJSON(): ContextJSON,
    inspect(): ContextJSON,

    // ToDo: add const for some props,
    // while the `const props` feature is landing in future
    // cherry pick from response
    attachment: $PropertyType<Response, 'attachment'>,
    redirect: $PropertyType<Response, 'redirect'>,
    remove: $PropertyType<Response, 'remove'>,
    vary: $PropertyType<Response, 'vary'>,
    set: $PropertyType<Response, 'set'>,
    append: $PropertyType<Response, 'append'>,
    flushHeaders: $PropertyType<Response, 'flushHeaders'>,
    status: $PropertyType<Response, 'status'>,
    message: $PropertyType<Response, 'message'>,
    body: $PropertyType<Response, 'body'>,
    length: $PropertyType<Response, 'length'>,
    type: $PropertyType<Response, 'type'>,
    lastModified: $PropertyType<Response, 'lastModified'>,
    etag: $PropertyType<Response, 'etag'>,
    headerSent: $PropertyType<Response, 'headerSent'>,
    writable: $PropertyType<Response, 'writable'>,

    // cherry pick from request
    acceptsLanguages: $PropertyType<Request, 'acceptsLanguages'>,
    acceptsEncodings: $PropertyType<Request, 'acceptsEncodings'>,
    acceptsCharsets: $PropertyType<Request, 'acceptsCharsets'>,
    accepts: $PropertyType<Request, 'accepts'>,
    get: $PropertyType<Request, 'get'>,
    is: $PropertyType<Request, 'is'>,
    querystring: $PropertyType<Request, 'querystring'>,
    idempotent: $PropertyType<Request, 'idempotent'>,
    socket: $PropertyType<Request, 'socket'>,
    search: $PropertyType<Request, 'search'>,
    method: $PropertyType<Request, 'method'>,
    query: $PropertyType<Request, 'query'>,
    path: $PropertyType<Request, 'path'>,
    url: $PropertyType<Request, 'url'>,
    origin: $PropertyType<Request, 'origin'>,
    href: $PropertyType<Request, 'href'>,
    subdomains: $PropertyType<Request, 'subdomains'>,
    protocol: $PropertyType<Request, 'protocol'>,
    host: $PropertyType<Request, 'host'>,
    hostname: $PropertyType<Request, 'hostname'>,
    header: $PropertyType<Request, 'header'>,
    headers: $PropertyType<Request, 'headers'>,
    secure: $PropertyType<Request, 'secure'>,
    stale: $PropertyType<Request, 'stale'>,
    fresh: $PropertyType<Request, 'fresh'>,
    ips: $PropertyType<Request, 'ips'>,
    ip: $PropertyType<Request, 'ip'>,

    [key: string]: mixed;
  }

  declare type middlewareCallBack =
    (ctx: Context, next: Promise<Function>) => Promise<void>|void;
  declare type ApplicationJSON = {
    'subdomainOffset': mixed,
    'proxy': mixed,
    'env': string,
  };
  declare class Application extends events$EventEmitter {
    context: Context,
    env: string,
    middleware: Array<Function>,
    proxy: boolean,
    request: Request,
    response: Response,
    subdomainOffset: number,

    listen: $PropertyType<Server, 'listen'>,
    toJSON(): ApplicationJSON,
    inspect(): ApplicationJSON,
    use(fn: middlewareCallBack): this,
  }

  declare module.exports: Class<Application>;
}
