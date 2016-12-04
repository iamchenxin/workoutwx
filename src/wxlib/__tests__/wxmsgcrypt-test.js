// @flow
const config = require('../../../priv/config.js');
const { token, encodingAESKey, corpID} = config.wechat;
import { WXBizMsgCrypt } from '../wxmsgcrypt.js';
const fs = require('../../utils/fs.js').fs;
import { toTmpDir, format } from '../../utils/tools.js';
import type {WxMsg, WxMsgBase, WxArticlesMsg } from '../wxxml_compiler.js';


const wxCrypt = new WXBizMsgCrypt(token, encodingAESKey, corpID);
describe('WXBizMsgCrypt', () => {
  const base = {
    FromUserName: 'wx312381238',
    ToUserName: 'mobs001',
    CreateTime: '1355434',
  };
  const atc: WxArticlesMsg = {
    MsgType: 'news',
    Articles: [{
      Title: '你来我家接我吧',
      Description: '这是女神与高富帅之间的对话',
      PicUrl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
      Url: 'http://nodeapi.cloudfoundry.com/',
    }],
  };
  it('encrypt', () => {
    const str = wxCrypt.buildBody(atc, base);
    console.log(str);
  });
});
