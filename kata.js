/**
 * Lets practice functional programming by building our own
 * functional library in the vein of underscore, lodash, and ramda,
 *
console.log("*--------------------------------------------*")

/**
 * The global object we're going to attach all our utility methods to
 */
const M = {};

// This blank variable is what you'll be replacing.
const __ = function() { throw new Error('please fill me in.'); }

// No need for a testing library, lets build our own asserts.
const assert = (bool, string) => { if(!bool) throw(new Error(string)) }
const assertEq = (a, b) => {
  if(a !== b) {
    throw(new Error('Expected ' + a + ' to eq ' + b))
  }
}

/* Before we get started, make sure we understand that
 * functions can return other functions.
 *
 * Lets write a function that returns other functions.
 *
 * We're going to write a function called say, that returns
 * a new function that just returns that string.
 */
const say = (string) => {
  return () => string //__()
}

const sayHello = say("hello")

assertEq(typeof say, "function")
assertEq(sayHello(), "hello")

/**
 * Lets get started with one of the most basic ideas.
 *
 * The identity function always returns what was passed to it
 *
 * Write a function that takes one parameter and returns that same parameter
 */
M.identity = __
M.identity = (x) => x

assertEq(M.identity(1), 1)

/**
 * Each will take a function and an array, and perform that function
 * for every argument in the array.
 */
M.each = (fn, list) => __()
M.each = (fn, list) => {
  for (i = 0; i < list.length; i++) {
    fn(list[i])
  }
}

let str = ''
let addToStr = (letter) => str += letter

const letters = ['h', 'e', 'l', 'l', 'o']

M.each(addToStr, letters)
assertEq(str, 'hello')

/**
 * Map produces a new array of values by mapping each value in list
 * through a transformation function.
 */
M.map = (fn, list) => __()

M.map = (fn, list) => {
  let rv = [];
  let addToArray = (i) => rv.push(fn(i))
  M.each(addToArray, list);
  return rv;
}

const double = (x) => x * 2

let numbers = [1, 2, 3, 4]
const newNumbers = M.map(double, numbers)

assertEq(newNumbers.toString(), [2, 4, 6, 8].toString())

/* filter takes a predicate and returns a new array
 * for which all the elements in the predicate return true.
 */
M.filter = (fn, numbers) => __()
M.filter = (callback, numbers) => {
  let rv = [];
  let addToArray = (i) => callback(i) && rv.push(i)
  M.each(addToArray, numbers);
  return rv;
}

const isEven = (x) => x % 2 == 0;

assertEq(M.filter(isEven, [1, 2, 3, 4]).toString(), [2, 4].toString())


/* Reduce builds up a single result from a list of values
 */
M.reduce = (fn, acc, array) => {
  let newAcc = acc;

  M.each((i) => {
    newAcc = fn(newAcc, i);
  }, array)

  return newAcc;
}

const add = (a, b) => a + b

let total = M.reduce(add, 0, [1, 2, 3, 4])
assertEq(total, 10)

// PropEq
//------

M.propEq = (prop, val) => (obj) => obj[prop] === val;

const people = [{firstName: 'Jon'}, { firstName: 'Sansa'}]

let jons = M.filter(M.propEq('firstName', 'Jon') , people)

assertEq(jons.length, 1)

// Currying
//------

//const curriedAdd = __

const curriedAdd = (a) => (b) => add(a, b)

const add2 = curriedAdd(2)

assert(add2(3) == 5, "Curry")

/* Performs right-to-left function composition.
 * The rightmost function may have any arity; the remaining functions must be unary.
 *
 *  Hint: you'll need to be familiar with `arguments` and `.apply`. If you're not
 *  this might be a good place to cheat.
 */
M.compose = function() {
  var args = arguments;
  var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
};

let doubleThrice = M.compose(
  double, double, double
)
assertEq(doubleThrice(3), 24)

/* Complement takes a function and returns a new function
 * that returns the opposite result
 */
M.complement = (fn) => __()
const isOdd = M.complement(isEven)

assertEq(isOdd(2), false)

/* Reject is like filter, only returning elements not matching the predicate
 * This is the perfect place to use complement.
 */
M.reject = M.complement(M.filter)
assertEq(M.reject(isOdd, [1, 2]), [1])

console.log("You've completed the lesson! Now on to extra credit...\n")
console.log(" * Refactor?")
console.log(" * Are you sure you're not mutating anything?")
console.log(" * Compare your implementation to those in lodash or preferably ramda.\n")
console.log('*--------------------------------------------*')
