import _ from 'underscore';

export default class Stack {
    constructor(name, expires) {
        this.name = name;
        this.expires = expires;
        // storage settings
        if (expires !== 'undefined' && !expires) {
            this.storage = sessionStorage;
            this.data = this.parse(this.get(name));
        } else {
            if (typeof expires == 'number') {
                this.expires = expires;
            } else {
                this.expires = Stack.before_days(60);
            }
            this.storage = localStorage;
            this.data = this.parse(this.get(name));
            this.expires_clear();
        }
    }
    get(name = this.name) {
        try {
            return this.storage.getItem(name) || '';
        } catch (err) {
            console.error(err);
        }
        return '';
    }
    save(data = null) {
        if (data) {
            this.add(data);
        }
        let item = this.to_string(this.data);
        try {
            this.storage.setItem(this.name, item);
        } catch (err) {
            console.error(err);
        }
        return this.last();
    }
    clear(name = this.name) {
        try {
            return this.storage.removeItem(name) || '';
        } catch (err) {
            console.error(err);
        }
    }
    expires_clear(expires = this.expires) {
        let timestamp = this.now() - expires;
        this.data = _.filter(this.data, (item) => {
            return item[0] > timestamp;
        });
        this.save();
    }
    first() {
        return _.first(this.data);
    }
    last() {
        return _.last(this.data);
    }
    search(string) {
        return _.filter(this.data, function(item) {
            return item[1] == string;
        });
    }
    count(string) {
        if (string) return this.search(string).length || 0;
        return this.data.length;
    }
    add(data) {
        let timestamp = this.now();
        this.data.push([timestamp, data]);
        return this.last();
    }
    pop() {
        if (this.data[0]) {
            this.data.pop();
            this.save();
        }
        return this.last();
    }
    parse(src) {
        try {
            return JSON.parse(src);
        } catch (err) {
            return [];
        }
    }
    to_string(data = this.data) {
        return JSON.stringify(data);
    }
    log(data = this.data) {
        _.forEach(data, function(item) {
            let time = new Date(item[0] * 1000);
        });
    }
    now() {
        return Math.round(Date.now() * 0.001);
    }
    static before_days(days) {
        return 86400 * ~~days;
    }
    static before_hours(hours) {
        return 3600 * ~~hours;
    }
}
