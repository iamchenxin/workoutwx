'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class SecurityError extends Error {}

exports.SecurityError = SecurityError;
class MessageError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }

}

exports.MessageError = MessageError;
class SpawnError extends Error {}

exports.SpawnError = SpawnError;
class RepoFileError extends Error {}

exports.RepoFileError = RepoFileError;
class WXCrypToError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code ? code : 'error';
  }
}

exports.WXCrypToError = WXCrypToError;
class WXXmlError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code ? code : 'error';
  }
}
exports.WXXmlError = WXXmlError;
//# sourceMappingURL=error.js.map
