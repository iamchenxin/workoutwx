// @flow

const crypto = require('crypto');
const pro = require('flow-dynamic').pro;
const { mustBe} = pro;
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
  ): string,
  update(
    data: string,
    input_encoding: 'latin1'| 'base64' | 'hex',
    output_encoding: void
  ): Buffer,
  update(
    data: Buffer,
    input_encoding: void,
    output_encoding: 'latin1' | 'ascii' | 'utf8',
  ): string,
  update(
    data: Buffer,
    input_encoding: void,
    output_encoding: void
  ): Buffer,
}

type WXParams = {
  msg_signature: string,
  timestamp: string, // should be uint string
  nonce: string, // should be uint string
  echostr?: string,
};
/**
 * 提供基于PKCS7算法的加解密接口
 *
 */
const blockSize:number = 32;
const PKCS7Encoder = {
  /**
   * 填补加密的 Buffer 对齐 32位 // blockSize
   *
   * @param {Buffer} Buffer 需要进行填充补位操作的Buffer
   */
  encode(buff: Buffer): Buffer {
    let amountToPad = blockSize - (buff.length % blockSize);
    if ( amountToPad == 0 ) {
      amountToPad = blockSize;
    }

    const pad = Buffer.alloc(amountToPad);
    pad.fill(amountToPad);
    //const pad = mustNot(undefined, _pad, 'PKCS7Encoder encode failed!');
    return Buffer.concat([buff, pad]);
  },

  /**
   * 删除解密后Buffer的补位
   *
   * @param {Buffer} Buffer 解密后的Buffer
  */
  decode(buff: Buffer): Buffer {
    let pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
      pad = 0;
    }
    return buff.slice(0, buff.length - pad);
  },
};

/**
 * Prpcrypt class
 *
 * 提供接收和推送给公众平台消息的加解密接口.
 */
class Prpcrypt {
  token: string;
  corpId: string;
  key: Buffer;
  iv: Buffer;
  constructor(token: string, encodingAESKey: string, corpId: string) {
    this.token = token;
    this.corpId = corpId;
    const AESKey = Buffer.from(encodingAESKey + '=', 'base64');
    mustBe(32, AESKey.length, 'encodingAESKey invalid');
    this.key = AESKey;
    this.iv = AESKey.slice(0, 16);
  }

  decrypt(cipherStr: string) {
    // 创建解密对象，AES采用CBC模式，数据采用PKCS#7填充；
    // IV初始向量大小为16字节，取AESKey前16字节
    const decipher: _crypto$Decipher =
      (crypto.createDecipheriv('aes-256-cbc', this.key, this.iv): any);
    decipher.setAutoPadding(false);
    const plainBuf = Buffer.concat([
      decipher.update(cipherStr, 'base64'),
      decipher.final(),
    ]);
    const wx_buf = PKCS7Encoder.decode(plainBuf);
    // 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
    // 去除16位随机数
    const content = wx_buf.slice(20);
    const msgLength = wx_buf.slice(16, 20).readInt32BE(0);
    return {
      message: content.slice(0, msgLength).toString(),
      id: content.slice(msgLength).toString(),
    };
  }

  encrypt(plainMsg: string): string {
    // 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
    // 获取16B的随机字符串
    const randomStr = crypto.pseudoRandomBytes(16);

    const msgBuf = Buffer.from(plainMsg, 'utf8');

    const msgLengthBuf = Buffer.alloc(4); // msg_len(4B)
    msgLengthBuf.writeUInt32BE(msgBuf.length, 0);

    const corpIDBuf = Buffer.from(this.corpId, 'utf8');
    const dataBuf = Buffer.concat([
      randomStr, msgLengthBuf, msgBuf, corpIDBuf,
    ]);

    // 对buf进行补位操作
    const pkcs7buf = PKCS7Encoder.encode(dataBuf);

    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    cipher.setAutoPadding(false);

    const cipheredBuf = Buffer.concat([
      cipher.update(pkcs7buf), cipher.final(),
    ]);

    return cipheredBuf.toString('base64');
  }

  // 微信的签名是 'hex'
  getSignature( timestamp: string, nonce: string, cipheredTxt: string): string {
    var shasum = crypto.createHash('sha1');
    var arr = [this.token, timestamp, nonce, cipheredTxt].sort();
    shasum.update(arr.join(''));
    return shasum.digest('hex');
  }
}
export type {
  WXParams,
};
export {
  Prpcrypt,
};
