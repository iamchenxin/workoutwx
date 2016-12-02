// @flow
import { WXBizMsgCrypt } from '../wxlib/wxmsgcrypt.js';

const wxmsg = { msg_signature: '37ddb599c37eef131b8023ff781c7ae492d3a05f',
timestamp: '1480654548',
nonce: '377489156',
echostr: '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==',
}



function ts() {
  const wc = new WXBizMsgCrypt('mzdwork1tuo2',
  '1uUwdM7f5FK7VmGMdJ39dYWssb2SrGCv91F37ryiviU','aaa');
  wc.VerifyURL(wxmsg, 'relayEchoStr');
}

ts();
