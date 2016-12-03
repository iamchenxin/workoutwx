// @flow

import { promisify1arg } from './promise.js';

const node_fs = require('fs');
const pro = require('flow-dynamic').pro;
const {mustNot} = pro;

//const path = require('path');
//import {RepoFileError} from './error.js';

class FS {
  _ori_fs: typeof node_fs;
  encode: string;
  readFile: ( file: string|Buffer|number, option?: Object|string )
    => Promise<string|Buffer>;
  writeFile: ( file: string|Buffer|number, data: string|Buffer,
    option?: Object|string ) => Promise<string|Buffer>;
  _writeFile: ( file: string|Buffer|number, data: string|Buffer,
    option?: Object|string ) => Promise<string|Buffer>;
  constructor(u_ori_fs: typeof node_fs, encode?: string) {
    const ori_fs = mustNot(null, u_ori_fs, 'invalid fs');
    this.encode = encode ? encode : 'utf8';
    this._ori_fs = ori_fs;

    this._writeFile = promisify1arg(ori_fs.writeFile);
  }

  setEncoding(encode: string): string { // default is 'utf8'
    const old = this.encode;
    this.encode = encode;
    return old;
  }

  readFile( file: string|Buffer|number,
  _option?: Object|string): Promise<string|Buffer> {
    const option = _option ? _option : this.encode ;
    return new Promise( (resolve, reject) => {
      this._ori_fs.readFile(file, option, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  writeFile( file: string|Buffer|number, data: string|Buffer,
  _option?: Object|string ): Promise<string|Buffer> {
    const option = _option ? _option : this.encode ;
    return this._writeFile(file, data, option);
  }

}

const fs = new FS(node_fs);

module.exports = {
  fs: fs,
  FS: FS,
};
