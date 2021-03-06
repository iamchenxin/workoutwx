// @flow
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';
const config = require('../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;

// wx1.z.cc/work1/&msg_signature=37ddb599c37eef131b8023ff781c7ae492d3a05f&timestamp=1480654548&nonce=377489156&echostr='0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw=='
const wxmsg = { msg_signature: '37ddb599c37eef131b8023ff781c7ae492d3a05f',
timestamp: '1480654548',
nonce: '377489156',
echostr: '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==',
}



function ts() {
  const wc = new WXBizMsgCrypt(token,
  encodingAESKey,corpID);
  const e = wc.VerifyEchostr(wxmsg);
  console.log(e);
}

ts();
