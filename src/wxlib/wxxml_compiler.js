// @flow
import { WXXmlError } from '../utils/error.js';
import { format } from '../utils/tools.js';


type WxMsgBase = {
  ToUserName: string,
  FromUserName: string,
  CreateTime: string,
//  MsgType: 'text'|'image'|'voice'|'video'|'music'|'news',
};

function baseXmlWrap(msgBase: WxMsgBase, innerData: string): string {
  const { ToUserName, FromUserName, CreateTime} = msgBase;
  const wxxml =
    '<xml>' +
    `<ToUserName><![CDATA[${ToUserName}]]></ToUserName>` +
    `<FromUserName><![CDATA[${FromUserName}]]></FromUserName>` +
    `<CreateTime>${CreateTime}</CreateTime>` +
    `${innerData}` +
    '</xml>';
  return wxxml;
}

type WxTextMsg = {
  MsgType: 'text',
  Content: string,
};

function textTpl(msg: WxTextMsg): string {
  const { Content } = msg;
  const text =
    '<MsgType><![CDATA[text]]></MsgType>' +
    `<Content><![CDATA[${Content}]]></Content>`;
  return text;
}

type WxImageMsg =  {
  MsgType: 'image',
  MediaId: string,
};

function imageTpl(msg: WxImageMsg): string {
  const {MediaId} = msg;
  const image =
    '<MsgType><![CDATA[image]]></MsgType>' +
    '<Image>' +
    `<MediaId><![CDATA[${MediaId}]]></MediaId>` +
    '</Image>';
  return image;
}

type WxVoiceMsg = {
  MsgType: 'voice',
  MediaId: string,
};

function voiceTpl(msg: WxVoiceMsg): string {
  const {MediaId} = msg;
  const voice =
    '<MsgType><![CDATA[voice]]></MsgType>' +
    '<Voice>' +
    `<MediaId><![CDATA[${MediaId}]]></MediaId>` +
    '</Voice>';
  return voice;
}

type WxVideoMsg = {
  MsgType: 'video',
  Title: string,
  Description: string,
  MediaId: string,
};

function videoTpl(msg: WxVideoMsg): string  {
  const {Title, Description, MediaId} = msg;
  const video =
    '<MsgType><![CDATA[video]]></MsgType>' +
    '<Video>' +
    `<MediaId><![CDATA[${MediaId}]]></MediaId>` +
    `<Title><![CDATA[${Title}]]></Title>` +
    `<Description><![CDATA[${Description}]]></Description>` +
    '</Video>';
  return video;
}

type WxMuiscMsg = {
  MsgType: 'music',
  Title: string,
  Description: string,
  MusicUrl: string,
  HQMusicUrl: string,
  ThumbMediaId: string,
}

function musicTpl(msg: WxMuiscMsg): string {
  const {Title, Description, MusicUrl, HQMusicUrl, ThumbMediaId} = msg;
  const music =
    '<MsgType><![CDATA[music]]></MsgType>' +
    '<Music>' +
    `<Title><![CDATA[${Title}]]></Title>` +
    `<Description><![CDATA[${Description}]]></Description>` +
    `<MusicUrl><![CDATA[${MusicUrl}]]></MusicUrl>` +
    `<HQMusicUrl><![CDATA[${HQMusicUrl}]]></HQMusicUrl>` +
    `<ThumbMediaId><![CDATA[${ThumbMediaId}]]></ThumbMediaId>` +
    '</Music>';
  return music;
}

type WxArticleMsg = {
  Title: string,
  Description: string,
  PicUrl: string,
  Url: string,
};

function _articleGen(msg: WxArticleMsg): string {
  const {Title, Description, PicUrl, Url} = msg;
  const article =
    '<item>' +
    `<Title><![CDATA[${Title}]]></Title>` +
    `<Description><![CDATA[${Description}]]></Description>` +
    `<PicUrl><![CDATA[${PicUrl}]]></PicUrl>` +
    `<Url><![CDATA[${Url}]]></Url>` +
    '</item>';
  return article;
}

type WxArticlesMsg = {
  MsgType: 'news',
  Articles: Array<WxArticleMsg>,
};

function articlesTpl( msg: WxArticlesMsg): string {
  const articles = msg.Articles.map( art => _articleGen(art));
  const articlesXml =
    '<MsgType><![CDATA[news]]></MsgType>' +
    `<ArticleCount>${articles.length}</ArticleCount>` +
    `<Articles>${articles.join('')}</Articles>`;
  return articlesXml;
}

/*
type WxMsg = (WxMsgBase & WxTextMsg) |
(WxMsgBase & WxImageMsg) |
(WxMsgBase & WxVoiceMsg) |
(WxMsgBase & WxVideoMsg) |
(WxMsgBase & WxMuiscMsg) |
(WxMsgBase & WxArticlesMsg) ;
*/

type WxMsg = WxTextMsg | WxImageMsg | WxVoiceMsg |
  WxVideoMsg | WxMuiscMsg | WxArticlesMsg;

function genWxMsg(_msg: WxMsg, msgBase: WxMsgBase): string {
  const msg = _msg;
  let innerData = '';
  switch (msg.MsgType) { // flow static check.
    case 'text':
      innerData = textTpl(msg);
      break;
    case 'image':
      innerData = imageTpl(msg);
      break;
    case 'voice':
      innerData = voiceTpl(msg);
      break;
    case 'video':
      innerData = videoTpl(msg);
      break;
    case 'music':
      innerData = musicTpl(msg);
      break;
    case 'news':
      innerData = articlesTpl(msg);
      break;
    default:
      throw new WXXmlError(`unknown msg:\n${format(_msg)}\n`,
      'genWxMsg');
  }
  return baseXmlWrap(msgBase, innerData);
}

export type {
  WxMsgBase,
  WxMsg,
  WxTextMsg,
  WxImageMsg,
  WxVoiceMsg,
  WxVideoMsg,
  WxMuiscMsg,
  WxArticlesMsg,
};

export {
  genWxMsg,
};
