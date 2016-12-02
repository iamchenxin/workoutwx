// @flow
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
// https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
// https://nodejs.org/dist/latest-v7.x/docs/api/http.html
// prased keys are lowercased.
/*
 * Duplicates of age, authorization, content-length, content-type, etag, expires, from, host, if-modified-since, if-unmodified-since, last-modified, location, max-forwards, proxy-authorization, referer, retry-after, or user-agent are discarded.
 * set-cookie is always an array. Duplicates are added to the array.
 * For all other headers, the values are joined together with ', '.
*/
type Headers = {
  // authentication
  'www-authenticate'?: string,
  authorization?: string,
  'proxy-authenticate'?: string,
  'proxy-authorization'?: string,
  // caching
  age?: string,
  'cache-control'?: string,
  expires?: string,
  pragma?: string,
  warning?: string,
  // client hints
  'accept-ch'?: string,
  'content-dpr'?: string,
  dpr?: string,
  downlink?: string,
  'save-data'?: string,
  'viewport-width'?: string,
  width?: string,
  // conditionals
  'last-modified'?: string,
  etag?: string,
  'if-match'?: string,
  'if-none-match'?: string,
  'if-modified-since'?: string,
  'if-unmodified-since'?: string,
  // connection management
  connection?: string,
  'keep-alive'?: string,
  // content negotiation
  accept?: string,
  'accept-charset'?: string,
  'accept-encoding'?: string,
  'accept-language'?: string,
  // controls
  expect?: string,
  'max-forwards'?: string,
  // cookies
  cookie?: string,
  'set-cookie'?: string[], //  is always an array
  // cors
  'access-control-allow-origin'?: string,
  'access-control-allow-credentials'?: string,
  'access-control-allow-headers'?: string,
  'access-control-allow-methods'?: string,
  'access-control-expose-headers'?: string,
  'access-control-max-age'?: string,
  'access-control-request-headers'?: string,
  'access-control-request-method'?: string,
  origin?: string,
  // do not track
  dnt?: string,
  tk?: string,
  // downloads
  'content-disposition'?: string,
  // message body information
  'content-length'?: string,
  'content-type'?: string,
  'content-encoding'?: string,
  'content-language'?: string,
  'content-location'?: string,
  // message routing
  via?: string,
  // redirects
  location?: string,
  // request context
  from?: string,
  host?: string,
  referer?: string,
  'referrer-policy'?: string,
  'user-agent'?: string,
  // response context
  allow?: string,
  server?: string,
  // range requests
  'accept-ranges'?: string,
  range?: string,
  'if-range'?: string,
  'content-range'?: string,
  // security
  'content-security-policy'?: string,
  'content-security-policy-report-only'?: string,
  'public-key-pins'?: string,
  'pbblic-key-pins-report-only'?: string,
  'strict-transport-security'?: string,
  'upgrade-insecure-requests'?: string,
  'x-content-type-options'?: string,
  'x-frame-options'?: string,
  'x-xss-protection'?: string,
  // server-sent events
  'ping-from'?: string,
  'ping-to'?: string,
  'last-event-id'?: string,
  // transfer coding
  'transfer-encoding'?: string,
  te?: string,
  trailer?: string,
  // websockets
  'sec-websocket-key'?: string,
  'sec-websocket-extensions'?: string,
  'sec-websocket-accept'?: string,
  'sec-websocket-protocol'?: string,
  'sec-websocket-version'?: string,
  // other
  date?: string,
  link?: string,
  'retry-after'?: string,
  upgrade?: string,
  vary?: string,
  'x-content-duration'?: string,
  'x-dns-prefetch-control'?: string,
  'x-requested-with'?: string,
  'x-ua-compatible'?: string,
}

type A = {
  a: string,
};
type B = {
  b: number,
};

function ts(v: A&B) {
  const aa: number = v.b;
}

function ts(a: Headers) {
  a['date'] = '1';
}
const b:Object = {
  a:1,
};
ts(b);
