/**
 * promise串行
 * @param {*} arr
 * @returns
 */
function promiseReducer(arr) {
  const res = [];
  return new Promise((resolve, reject) => {
    arr
      .reduce((pre, cur) => {
        return pre.then(cur).then((data) => res.push(data));
      }, Promise.resolve())
      .then(() => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = promiseReducer;
