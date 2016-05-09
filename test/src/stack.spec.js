import Stack from '../../build/stack.js';

// Assertion function
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

const memo = {};
global.localStorage = {
    setItem(key, value) {
        memo[key] = value;
    },
    getItem(key) {
        return memo[key];
    },
    removeItem(key) {
        delete memo[key];
    }
};

// Initialize
const stack = new Stack('test', 1);

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

