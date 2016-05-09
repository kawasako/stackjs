'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stack = function () {
    function Stack(name, expires) {
        _classCallCheck(this, Stack);

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

    _createClass(Stack, [{
        key: 'get',
        value: function get() {
            var name = arguments.length <= 0 || arguments[0] === undefined ? this.name : arguments[0];

            try {
                return this.storage.getItem(name) || '';
            } catch (err) {
                console.error(err);
            }
            return '';
        }
    }, {
        key: 'save',
        value: function save() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (data) {
                this.add(data);
            }
            var item = this.to_string(this.data);
            try {
                this.storage.setItem(this.name, item);
            } catch (err) {
                console.error(err);
            }
            return this.last();
        }
    }, {
        key: 'clear',
        value: function clear() {
            var name = arguments.length <= 0 || arguments[0] === undefined ? this.name : arguments[0];

            try {
                return this.storage.removeItem(name) || '';
            } catch (err) {
                console.error(err);
            }
        }
    }, {
        key: 'expires_clear',
        value: function expires_clear() {
            var expires = arguments.length <= 0 || arguments[0] === undefined ? this.expires : arguments[0];

            var timestamp = this.now() - expires;
            this.data = _underscore2.default.filter(this.data, function (item) {
                return item[0] > timestamp;
            });
            this.save();
        }
    }, {
        key: 'first',
        value: function first() {
            return _underscore2.default.first(this.data);
        }
    }, {
        key: 'last',
        value: function last() {
            return _underscore2.default.last(this.data);
        }
    }, {
        key: 'search',
        value: function search(string) {
            return _underscore2.default.filter(this.data, function (item) {
                return item[1] == string;
            });
        }
    }, {
        key: 'count',
        value: function count(string) {
            if (string) return this.search(string).length || 0;
            return this.data.length;
        }
    }, {
        key: 'add',
        value: function add(data) {
            var timestamp = this.now();
            this.data.push([timestamp, data]);
            return this.last();
        }
    }, {
        key: 'pop',
        value: function pop() {
            if (this.data[0]) {
                this.data.pop();
                this.save();
            }
            return this.last();
        }
    }, {
        key: 'parse',
        value: function parse(src) {
            try {
                return JSON.parse(src);
            } catch (err) {
                return [];
            }
        }
    }, {
        key: 'to_string',
        value: function to_string() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? this.data : arguments[0];

            return JSON.stringify(data);
        }
    }, {
        key: 'log',
        value: function log() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? this.data : arguments[0];

            _underscore2.default.forEach(data, function (item) {
                var time = new Date(item[0] * 1000);
            });
        }
    }, {
        key: 'now',
        value: function now() {
            return Math.round(Date.now() * 0.001);
        }
    }], [{
        key: 'before_days',
        value: function before_days(days) {
            return 86400 * ~ ~days;
        }
    }, {
        key: 'before_hours',
        value: function before_hours(hours) {
            return 3600 * ~ ~hours;
        }
    }]);

    return Stack;
}();

exports.default = Stack;