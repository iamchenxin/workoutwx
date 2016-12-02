'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.promisify1arg = promisify1arg;
exports.promisify = promisify;
exports.promisifyObject = promisifyObject;
exports.queue = queue;

var _flowDynamic = require('flow-dynamic');

const { mustBe } = _flowDynamic.pro;
function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// result alway be an Array [a,b,c]
function promisify1arg(callback_fn) {
  return to_promise;

  function to_promise(...args) {
    return new Promise(function (resolve, reject) {
      args.push(function (err, ...result) {
        // all nodejs's last arg is callback
        mustBe(true, result.length <= 1, 'This function must return signle result');
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
      callback_fn.apply(null, args);
    });
  }
}
function promisify(fn, firstData) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      args.push(function (err, ...result) {
        let res = result;

        if (firstData) {
          res = err;
          err = null;
        }

        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

      fn.apply(null, args);
    });
  };
}

function promisifyObject(obj) {
  const promisedObj = {};
  for (const key in obj) {
    promisedObj[key] = promisify(obj[key]);
  }
  return promisedObj;
}

function queue(arr, promiseProducer, concurrency = Infinity) {
  concurrency = Math.min(concurrency, arr.length);

  // clone
  arr = arr.slice();

  const results = [];
  let total = arr.length;
  if (!total) {
    return Promise.resolve(results);
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < concurrency; i++) {
      next();
    }

    function next() {
      const item = arr.shift();
      const promise = promiseProducer(item);

      promise.then(function (result) {
        results.push(result);

        total--;
        if (total === 0) {
          resolve(results);
        } else {
          if (arr.length) {
            next();
          }
        }
      }, reject);
    }
  });
}
//# sourceMappingURL=promise.js.map
