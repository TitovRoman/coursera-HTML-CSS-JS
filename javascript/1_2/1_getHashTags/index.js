/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    let wordsFromTweet = tweet.split(' ');
    let hashTags = [];
    for (let hashTag of wordsFromTweet) {
        if (hashTag.startsWith('#')) {
            hashTag = hashTag.slice(1);
            if (!hashTags.includes(hashTag)) {
                hashTags.push(hashTag);
            }
        }
    }
    return hashTags;
};
