'use strict';

var _promise = require('./promise.js');

const node_fs = require('fs');

const pro = require('flow-dynamic').pro;
const { mustNot } = pro;

//const path = require('path');
//import {RepoFileError} from './error.js';

class FS {
  constructor(u_ori_fs, encode) {
    const ori_fs = mustNot(null, u_ori_fs, 'invalid fs');
    this.encode = encode ? encode : 'utf8';
    this._ori_fs = ori_fs;

    this._writeFile = (0, _promise.promisify1arg)(ori_fs.writeFile);
  }

  setEncoding(encode) {
    // default is 'utf8'
    const old = this.encode;
    this.encode = encode;
    return old;
  }

  readFile(file, _option) {
    const option = _option ? _option : this.encode;
    return new Promise((resolve, reject) => {
      this._ori_fs.readFile(file, option, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  writeFile(file, data, _option) {
    const option = _option ? _option : this.encode;
    return this._writeFile(file, data, option);
  }

}

const fs = new FS(node_fs);

module.exports = {
  fs: fs,
  FS: FS
};
//# sourceMappingURL=fs.js.map
