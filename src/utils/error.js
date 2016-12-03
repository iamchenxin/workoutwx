/* @flow */

export class SecurityError extends Error {}

export class MessageError extends Error {
  constructor(msg: string, code?: string) {
    super(msg);
    this.code = code;
  }

  code: ?string;
}

export class SpawnError extends Error {
  EXIT_CODE: number;
}

export class RepoFileError extends Error {
}

export class WXCrypToError extends Error {
  code: ?string;
  constructor(msg?: string, code?: string) {
    super(msg);
    this.code = code?code:'error';
  }
}

export class WXXmlError extends Error {
  code: ?string;
  constructor(msg?: string, code?: string) {
    super(msg);
    this.code = code?code:'error';
  }
}
