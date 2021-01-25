/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    return new myDate(date);
};

function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

function checkDurations(duration) {
    let availableDurations = ['years', 'months', 'days', 'hours', 'minutes']
    return availableDurations.includes(duration);
}

class myDate extends Date {
    constructor(date) {
        super(date);
    }

    getCourseraFormatDate() {
        return this.getFullYear() +
          '-' + pad(this.getMonth() + 1) +
          '-' + pad(this.getDate()) +
          ' ' + pad(this.getHours()) +
          ':' + pad(this.getMinutes())
    };

    get value() {
        return this.getCourseraFormatDate(); 
    }

    changeDate(value, durations) {
        if (!checkDurations(durations)) {
            throw new TypeError('Unknown duration')
        }

        switch (durations) {
            case 'years' : this.setFullYear(this.getFullYear() + value); break;
            case 'months' : this.setMonth(this.getMonth() + value); break;
            case 'days' : this.setDate(this.getDate() + value); break;
            case 'hours' : this.setHours(this.getHours() + value); break;
            case 'minutes' : this.setMinutes(this.getMinutes() + value); break;
        }
        return this;
    }

    add(value, durations) {
        if ( value < 0) {
            throw new TypeError('The value cannot be negative')
        }

        return this.changeDate(value, durations);
    }

    subtract(value, durations) {
        if ( value < 0 ) {
            throw new TypeError('The value cannot be negative')
        }

        return this.changeDate(-value, durations);
    }
}
