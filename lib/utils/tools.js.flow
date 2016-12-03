// @flow
const util = require('util');
const path = require('path');
const base = require('../../config/base.js');

function JSONstring(ob: Object): string {
  return JSON.stringify(ob, null, 2);
}

function log() {
  console.log.apply(null, arguments);
}

function warn() {
  console.warn.apply(null, arguments);
}

function format(v: mixed): string {
  return util.inspect(v, {depth: null});
}

// pretty format, for console display
function pFormat(v: mixed): string {
  return util.inspect(v, {
    depth: null,
    colors: true,
  });
}

function formatProp(v: mixed): string {
  if ( typeof v === 'object' && v != null) {
    const ob = v;
    const str = Object.keys(ob).map( key => {
      return `${key}:<br/>\n ${util.inspect(ob[key], {depth: null})}\n\n\n`;
    }).join('<br/>\n');
    return str;
  } else {
    return format(v);
  }
}

function makerResolveToPath(absPath: string): (fname: string) => string {
  return toPath;
  function toPath(fileName: string): string {
    return path.resolve(absPath, fileName);
  }
}
const toTmpDir = makerResolveToPath(base.paths.tmpdir);

module.exports = {
  JSONstring,
  format,
  pFormat,
  formatProp,
  makerResolveToPath,
  toTmpDir,
};
