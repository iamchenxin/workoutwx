// @flow

function getRawBody(req: http$IncomingMessage): Promise<Buffer> {
  return new Promise(function(resolve, reject) {
    const buffs = [];
    req.on('data', trunk => {
      buffs.push(trunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(buffs));
    });
    req.on('error', reject);
  });
}

export {
  getRawBody,
};
