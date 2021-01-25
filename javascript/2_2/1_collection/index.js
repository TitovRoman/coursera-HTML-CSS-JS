module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.array = new Array();
}

Object.setPrototypeOf(Collection.prototype, Array.prototype);


// Методы коллекции
Collection.prototype.values = function () {
    return this.slice();
};

Collection.prototype.count = function () {
    return this.length;
}

Collection.prototype._checkPosition = function(position) {
    return position > 0 && position <= this.count();
}

Collection.prototype.at = function(position) {
    if (!this._checkPosition(position)) {
        return null;
    }
    return this[position-1];
}

Collection.prototype.append = function(newElement) {
    if (newElement instanceof Array) {
        this.push(...newElement);
    } else {
        this.push(newElement);
    }
}

Collection.prototype.removeAt = function(position) {
    if (!this._checkPosition(position)) {
        return false;
    }
    this.splice(position-1, 1);
    return true;
}


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (array) {
    let collection = new Collection();
    collection.append(array);
    return collection;
};
