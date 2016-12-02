'use strict';

const crypto = require('crypto');


class MYS {
  constructor(token) {
    this.token = token;
    this.cipher = crypto.createCipher('aes256', token);
    this.decipher = crypto.createDecipher('aes256', token);
  }
  encrypt(str) {
    let ens = this.cipher.update(str, 'utf8', 'base64');
    ens += this.cipher.final('base64');
    return ens;
  }
  decrypt(str) {
    let des = this.decipher.update(str, 'base64', 'utf8');
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

function ts2() {
  console.log(crypto.getCiphers());
}

function ts3() {
  const s = new MYS('123ghd');
  const ens = s.encrypt('你好啊,我是刘的哈');
  console.log(`encrypt = ${ ens }`);
  const des = s.decrypt(ens);
  console.log(`decrypt = ${ des }`);
}

ts3();
//# sourceMappingURL=mcrypto.js.map
