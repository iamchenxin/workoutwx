response.is & request.is

all the functions from 'accepts', where did the 'void' come from?

// flow .lib
// https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_message_headers
// https://nodejs.org/dist/latest-v7.x/docs/api/http.html#http_message_headers
declare type SimpleHeader = {
  'set-cookie': Array<string>|void,
  [key: string]: string|void,
};


// seems!! node's headers has a `'set-cookie': Array<string>`
// but the node's api `response.getHeader(name)` return it as a string.
// in truth! in raw header, it is a string.
