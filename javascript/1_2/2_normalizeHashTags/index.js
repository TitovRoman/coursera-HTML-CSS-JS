/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    let tagMap = new Set();
    let tagList = [];
    for (let tag of hashtags) {
        tag = tag.toLocaleLowerCase();
        if (!tagMap.has(tag)) {
            tagMap.add(tag)
            tagList.push(tag);
        }
    }
    return tagList.join(', ')
};
