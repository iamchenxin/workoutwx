// @flow
const crypto = require('crypto');
import { Prpcrypt } from '../wxlib/wxcrypto.js';
declare class _crypto$Decipher extends stream$Duplex {
  final(output_encoding: 'latin1' | 'ascii' | 'utf8'): string,
  final(output_encoding: void): Buffer,
  getAuthTag(): Buffer,
  setAAD(buffer: Buffer): void,
  setAuthTag(buffer: Buffer): void,
  setAutoPadding(auto_padding?: boolean): crypto$Cipher,
  update(
    data: string,
    input_encoding: 'latin1'| 'base64' | 'hex',
    output_encoding: 'latin1' | 'ascii' | 'utf8',
  ): string;
  update(
    data: string,
    input_encoding: 'latin1'| 'base64' | 'hex',
    output_encoding: void
  ): Buffer;
  update(
    data: Buffer,
    input_encoding: void,
    output_encoding: 'latin1' | 'ascii' | 'utf8',
  ): string;
  update(
    data: Buffer,
    input_encoding: void,
    output_encoding: void
  ): Buffer;
}

class MYS {
  token: string;
  cipher: crypto$Cipher;
  decipher: _crypto$Decipher;
  constructor(ciphers: string,token: string) {
    this.token = token;
    this.cipher = crypto.createCipher(ciphers, token);
    this.decipher = (crypto.createDecipher(ciphers, token):any);
  }
  encrypt(str: string): string {
    let ens = this.cipher.update(str,'utf8','base64');
    ens += this.cipher.final('base64');
    return ens;
  }
  decrypt(str: string): string {
    let des = this.decipher.update(str,'base64','utf8');
    des += this.decipher.final('utf8');
    return des;
  }
}
/*
function ts() { // this is wrong!
  const s = new MYS('135fgh');
  const ens = s.encrypt.update('你好啊,我是刘的哈','utf8','base64');
  ens += cipher.final('hex');
  console.log(`encrypt = ${ens}`);
  const des = s.decrypt.update(ens,'base64','utf8');
  console.log(`decrypt = ${des}`);
}
*/

class CVI {
  iv: Buffer;
  key: Buffer;
  cipher: crypto$Cipher;
  decipher: _crypto$Decipher;
  constructor(ciphers: string, wx_key) {
    const buf:Buffer = Buffer.from(wx_key, 'base64');
    // vi 总是 16 位,因此可以推断 微信是 aes-128
    this.iv = buf.slice(0,16);
    this.key = buf;
    this.cipher = crypto.createCipheriv(ciphers, this.key, this.iv);
    this.decipher = (crypto.createDecipheriv(ciphers, this.key, this.iv): any);
  }

  encrypt(str: string): string {
    let ens = this.cipher.update(str,'utf8','base64');
    ens += this.cipher.final('base64');
    return ens;
  }
  decrypt(str: string): string {
    let des = this.decipher.update(str,'base64','utf8');
    des += this.decipher.final('utf8');
    return des;
  }
  unde(str: string): string {
    const buf = Buffer.from(str, 'base64');
    const rt = Buffer.concat([
      this.decipher.update(buf),
      this.decipher.final(),
    ]);
    return rt.toString('base64');
  }
}

function ts2() {
  console.log(crypto.getCiphers());
}

function ts3() {
  const s256 = new MYS('aes256', '123ghd');
  const s192 = new MYS('aes192', '123ghd');
  const ens = s256.encrypt('你好啊,我是刘的哈');
  console.log(`encrypt = ${ens}`);
  const des = s192.decrypt(ens);
  console.log(`decrypt = ${des}`);
}
/*
{ msg_signature: '37ddb599c37eef131b8023ff781c7ae492d3a05f',
timestamp: '1480654548',
nonce: '377489156',
echostr: '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==' }
*/
function ts5() {
  const b64 = Buffer.from('1uUwdM7f5FK7VmGMdJ39dYWssb2SrGCv91F37ryiviU', 'base64');
  console.log(b64.length);
  const key = b64.toString('hex');

  console.log(key);
  const s = new MYS('aes256', key);
  const old = '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==';
//  const dwx = decodeURI(old);
//  const str = s.decrypt(old);
//  console.log(str);
}

function ts6() {
  const key = '1uUwdM7f5FK7VmGMdJ39dYWssb2SrGCv91F37ryiviU';
  const c = new CVI('aes-256-cbc', key);

  const old = '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==';
  const str = c.unde(old);
  const us = Buffer.from(str,'base64').toString('utf8');
  console.log(str);
  console.log(us);
}

function ts7(){
  const wxc = new Prpcrypt('mzdwork1tuo2',
  '1uUwdM7f5FK7VmGMdJ39dYWssb2SrGCv91F37ryiviU','aaa');
  const old = '0uyyRqk9sDSsa/shvlBcW+ZjYDSo5sXi1ntl4ltvx09Z/NwSWSAXtvT7R2o43AqpXD51j7H7vv96Nl7eZSWBxw==';
  const out = wxc.decrypt(old);
  console.log(out);
}

ts7();
