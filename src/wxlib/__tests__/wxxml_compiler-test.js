// @flow

const compiler = require('../wxxml_compiler.js');
import type { WxMsgBase, WxArticlesMsg } from '../wxxml_compiler.js';

// import { describe, it } from 'jest';

describe('aa', () => {

  const atc: WxMsgBase & WxArticlesMsg = {
    FromUserName: 'wx312381238',
    ToUserName: 'mobs001',
    CreateTime: '1355434',
    MsgType: 'news',
    Articles: [{
      Title: '你来我家接我吧',
      Description: '这是女神与高富帅之间的对话',
      PicUrl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
      Url: 'http://nodeapi.cloudfoundry.com/',
    }],
  };

  const j2 = {
    title: '来段音乐吧<',
    description: '一无所有>',
    musicUrl: 'http://mp3.com/xx.mp3?a=b&c=d',
    hqMusicUrl: 'http://mp3.com/xx.mp3?foo=bar',
  };

  it('test', () => {
    const info = compiler.genWxMsg(atc);
    console.log(info);
  //  const xmlMsg = compiler.msg(info);
  //  console.log(xmlMsg);
  });
});
