module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.subscriptions.has(event)) {
            this.subscriptions.set(event, []);
        }
        this.subscriptions.get(event).push([subscriber, handler.bind(subscriber)]);
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (this.subscriptions.has(event)) {
            this.subscriptions.set(event, this.subscriptions.get(event).filter(el => el[0] != subscriber));
        }

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.subscriptions.has(event)) {
            this.subscriptions.get(event).forEach(el => el[1]());
        }

        return this;
    },

    subscriptions : new Map(), // Map( event : [[subscriber1, handlerBind1], [subscriber2, handlerBind2]])
};
