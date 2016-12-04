// @flow

const compiler = require('../wxxml_compiler.js');
import type {WxMsg, WxMsgBase, WxArticlesMsg } from '../wxxml_compiler.js';

// import { describe, it } from 'jest';

describe('aa', () => {
  const base = {
    FromUserName: 'wx312381238',
    ToUserName: 'mobs001',
    CreateTime: '1355434',
  };

  function genMsg(msg: WxMsg): string {
    return compiler.genWxMsg(msg, base);
  }
  const atc: WxArticlesMsg = {
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

  it('test text msg', () => {
    const text = {
      MsgType: 'text',
      Content: 'hello!',
    };
    expect(genMsg(text)).toEqual(
      '<xml>' +
      '<ToUserName><![CDATA[mobs001]]></ToUserName>' +
      '<FromUserName><![CDATA[wx312381238]]></FromUserName>' +
      '<CreateTime>1355434</CreateTime>' +
      '<MsgType><![CDATA[text]]></MsgType>' +
      '<Content><![CDATA[hello!]]></Content>' +
      '</xml>'
    );
  //  const xmlMsg = compiler.msg(info);
  //  console.log(xmlMsg);
  });
});
