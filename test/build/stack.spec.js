"use strict";

var _stack = require("../../build/stack.js");

var _stack2 = _interopRequireDefault(_stack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assert function
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

var memo = {};
global.localStorage = {
    setItem: function setItem(key, value) {
        memo[key] = value;
    },
    getItem: function getItem(key) {
        return memo[key];
    },
    removeItem: function removeItem(key) {
        delete memo[key];
    }
};

// Initialize
var stack = new _stack2.default('test', 1);

// Save & Get
stack.save(1);
stack.save(2);
stack.save(3);
assert(stack.last()[1] == 3);
assert(stack.count() == 3);

// Pop & Get
stack.pop();
assert(stack.last()[1] == 2);

// Clear & Get
stack.expires_clear(999);
assert(stack.count() == 2);
stack.expires_clear(-999);
assert(stack.count() == 0);