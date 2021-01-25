/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    minutes += interval;
    hours += Math.floor(minutes / 60);

    minutes = Math.floor(minutes % 60);
    hours = Math.floor(hours % 24);

    return getStringTime(hours, minutes);
};

function getStringTime(hours, minutes) {
    let hoursZero = ( hours < 10 ) ? '0' : '';
    let minutesZero = ( minutes < 10 ) ? '0' : '';

    return `${hoursZero}${hours}:${minutesZero}${minutes}`;
}

