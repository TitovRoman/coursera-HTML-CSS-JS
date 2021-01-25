/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    function callbackToPromise(fun) {
        return new Promise( (resolve, reject) => {
            function callback(err, arg) {
                if (err) {
                    reject(err);
                } else {
                    resolve(arg);
                }
            }
            fun(callback);
        });
    }

    Promise.all(operations.map(value => callbackToPromise(value)))
        .then( values => callback(null, values),
               err => callback(err));
};