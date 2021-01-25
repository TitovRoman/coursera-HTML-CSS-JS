// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (inputCommand) {
    let [command, ...parameters] = inputCommand.split(' ');

    if (command == 'ADD') {
        let name = parameters[0];
        let phones = parameters[1].split(',');
        
        return addContact(name, phones);
    } else if (command == 'REMOVE_PHONE') {
        return removePhone(parameters[0]);
    } else if (command == 'SHOW') {
        return showContacts();
    } else {
        throw new Error("Unknown command");
    }
};

function addContact(contact, numbers) {
    if (!phoneBook.hasOwnProperty(contact)) {
        phoneBook[contact] = [];
    }
    phoneBook[contact].push(...numbers);
}

function removeContactPhoneAt(name, index) {
    phoneBook[name].splice(index, 1);

    if (phoneBook[name].length == 0) {
        delete phoneBook[name];
    }
}

function removePhone(number) {
    for (let [contact, numbers] of Object.entries(phoneBook)) {
        let phoneIndex = numbers.indexOf(number);
        if (phoneIndex != -1) {
            removeContactPhoneAt(contact, phoneIndex);
            return true;
        }
    }
    return false;
}

function showContacts() {
    let result = [];

    for (let contact of Object.keys(phoneBook).sort()) {
        let numbers = phoneBook[contact];
        if (numbers.length == 0) {
            continue;
        }
        result.push(contact + ': ' + numbers.join(', '));
    }
    return result;
}
