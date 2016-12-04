// @flow
import { WXXmlError } from '../utils/error.js';
import { format } from '../utils/tools.js';


type WxMsgBase = {
  ToUserName: string,
  FromUserName: string,
  CreateTime: string,
//  MsgType: 'text'|'image'|'voice'|'video'|'music'|'news',
};

function baseXmlWrap(baseMsg: WxMsgBase, innerData: string): string {
  const { ToUserName, FromUserName, CreateTime} = baseMsg;
  const wxxml =
`<xml>
<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
<CreateTime>${CreateTime}</CreateTime>
${innerData}
</xml>`;
  return wxxml;
}

type WxTextMsg = {
  MsgType: 'text',
  Content: string,
};

function textTpl(msg: WxMsgBase & WxTextMsg): string {
  const { Content } = msg;
  const text =
`<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${Content}]]></Content>`;
  return baseXmlWrap(msg, text);
}

type WxImageMsg =  {
  MsgType: 'image',
  MediaId: string,
};

function imageTpl(msg: WxMsgBase & WxImageMsg): string {
  const {MediaId} = msg;
  const image =
`<MsgType><![CDATA[image]]></MsgType>
<Image>
<MediaId><![CDATA[${MediaId}]]></MediaId>
</Image>`;
  return baseXmlWrap(msg, image);
}

type WxVoiceMsg = {
  MsgType: 'voice',
  MediaId: string,
};

function voiceTpl(msg: WxMsgBase & WxVoiceMsg): string {
  const {MediaId} = msg;
  const voice =
`<MsgType><![CDATA[voice]]></MsgType>
<Voice>
<MediaId><![CDATA[${MediaId}]]></MediaId>
</Voice>`;
  return baseXmlWrap(msg, voice);
}

type WxVideoMsg = {
  MsgType: 'video',
  Title: string,
  Description: string,
  MediaId: string,
};

function videoTpl(msg: WxMsgBase & WxVideoMsg): string  {
  const {Title, Description, MediaId} = msg;
  const video =
`<MsgType><![CDATA[video]]></MsgType>
<Video>
<MediaId><![CDATA[${MediaId}]]></MediaId>
<Title><![CDATA[${Title}]]></Title>
<Description><![CDATA[${Description}]]></Description>
</Video>`;
  return baseXmlWrap(msg, video);
}

type WxMuiscMsg = {
  MsgType: 'music',
  Title: string,
  Description: string,
  MusicUrl: string,
  HQMusicUrl: string,
  ThumbMediaId: string,
}

function musicTpl(msg: WxMsgBase & WxMuiscMsg): string {
  const {Title, Description, MusicUrl, HQMusicUrl, ThumbMediaId} = msg;
  const music =
`<MsgType><![CDATA[music]]></MsgType>
<Music>
<Title><![CDATA[${Title}]]></Title>
<Description><![CDATA[${Description}]]></Description>
<MusicUrl><![CDATA[${MusicUrl}]]></MusicUrl>
<HQMusicUrl><![CDATA[${HQMusicUrl}]]></HQMusicUrl>
<ThumbMediaId><![CDATA[${ThumbMediaId}]]></ThumbMediaId>
</Music>`;
  return baseXmlWrap(msg, music);
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
`<item>
<Title><![CDATA[${Title}]]></Title>
<Description><![CDATA[${Description}]]></Description>
<PicUrl><![CDATA[${PicUrl}]]></PicUrl>
<Url><![CDATA[${Url}]]></Url>
</item>`;
  return article;
}

type WxArticlesMsg = {
  MsgType: 'news',
  Articles: Array<WxArticleMsg>,
};

function articlesTpl( msg: WxMsgBase & WxArticlesMsg): string {
  const articles = msg.Articles.map( art => _articleGen(art));
  const articlesXml =
`<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>${articles.length}</ArticleCount>
<Articles>
${articles.join('')}
</Articles>`;
  return baseXmlWrap(msg, articlesXml);
}

type WxMsg = (WxMsgBase & WxTextMsg) |
(WxMsgBase & WxImageMsg) |
(WxMsgBase & WxVoiceMsg) |
(WxMsgBase & WxVideoMsg) |
(WxMsgBase & WxMuiscMsg) |
(WxMsgBase & WxArticlesMsg) ;

//(WxMsgBase & WxTextMsg) | WxImageMsg | WxVoiceMsg |
//  WxVideoMsg | WxMuiscMsg | WxArticlesMsg);

function genWxMsg(_msg: WxMsg): string {
  const msg = _msg;
  switch (msg.MsgType) { // flow static check.
    case 'text':
      return textTpl(msg);
    case 'image':
      return imageTpl(msg);
    case 'voice':
      return voiceTpl(msg);
    case 'video':
      return videoTpl(msg);
    case 'music':
      return musicTpl(msg);
    case 'news':
      return articlesTpl(msg);
    default:
      throw new WXXmlError(`unknown msg:\n${format(_msg)}\n`,
      'genWxMsg');
  }
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
