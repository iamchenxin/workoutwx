// @flow
declare var jest: Function;
declare var describe: Function;
declare var xdescribe: Function;
declare var it: Function;
declare var expect: Function;
declare var beforeAll: Function;

import { fs, FS} from '../fs.js';

const path = require('path');
const base = require('../../../config/base.js');

function tpdir(fileName: string): string {
  return path.resolve(base.paths.tpjest, fileName);
}

describe('test fs.js', () => {
  describe('test fs', () => {
    it('readFile', async () => {
      const ct = await fs.readFile(tpdir('fts'), 'utf8');
      expect(ct).toEqual('test file\n');
    });
    it('writeFile', async () => {
      const rt = await fs.writeFile(tpdir('wts'), 'hehe', 'utf8');
      expect(rt).toEqual(undefined);
      fs.setEncoding('utf8');
      const readT = await fs.readFile(tpdir('wts'));
      expect(readT).toEqual('hehe');
    });
  });

  describe('test FS fs2', () => {
    const _fs = require('fs');
    const fs_class = new FS(_fs, 'utf8');

    it('readFile', async () => {
      const ct = await fs_class.readFile(tpdir('fts'));
      expect(ct).toEqual('test file\n');
    });
    it('writeFile', async () => {
      const rt = await fs_class.writeFile(tpdir('wts'), 'hehe');
      expect(rt).toEqual(undefined);
      const readT = await fs_class.readFile(tpdir('wts'));
      expect(readT).toEqual('hehe');
    });
  });

});
