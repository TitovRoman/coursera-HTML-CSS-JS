let priorityFunctions = {
    '_filterIn' : 0, 
    '_select' : 1
};

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection, ...operations) {
    let newCollection = cloneCollection(collection);
   
    operations.sort((left, rigth) => priorityFunctions[left.name] - priorityFunctions[rigth.name]);

    for (let operator of operations) {
        operator(newCollection);
    }
    return newCollection;
}

function cloneCollection(collection) {
    return collection.map(obj => {
        let copy = {};
        Object.assign(copy, obj);
        return copy;
    });;
}

/**
 * @params {String[]}
 */
function select(...fields) {
    return function _select(collection) {
        let keysForDelete = Object.keys(collection[0]);

        keysForDelete = keysForDelete.filter(item => !fields.includes(item))

        for (let obj of collection){
            for (let key of keysForDelete) {
                delete obj[key];
            }
        }
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function _filterIn(collection) {
        for (let index = 0; index < collection.length; ++index){
            if(!values.includes(collection[index][property])) {
                collection.splice(index, 1);
                --index;
            }
        }
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
