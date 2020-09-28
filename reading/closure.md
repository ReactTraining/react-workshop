# Closure, Identity, and Capturing

## JavaScript's Lexical Scope

In JavaScript, functions are what create scope. Also, functions can go within other functions. Lexical scope means functions have access to their outer scope. So in this code, the `inner` function has access to the outer scope which means `inner` has access to `count`:

```js
function main() {
  const count = 5
  function inner() {
    return count
  }

  inner() // 5
}

main()
```

When this code runs, the output is `5` because `inner` can see `5` through lexical scope.

## Closures

A basic explanation of closure is anytime an inner function is returned from the outer function, and the inner function retains lexical scope of that outer function. For example:

"Closure" occurs when a function has variables in its scope, such as the `inner` function having `count`, and that function retains it's scope even though it is called elsewhere:

```js
// Notice this function returns a function
function getFunction() {
  const count = 5
  return function inner() {
    return count
  }
}

function main() {
  // x is a reference to the "inner" function
  const x = getFunction()
  x() // 5
}

main()
```

In the above code, `inner` has lexical scope to see `count`. The `count` variable is not in the scope of `main`, yet when the `main` function calls `x` which is a reference to `inner`, the `inner` function still knows what `count` is -- and that's "closure".

## Identity and Capturing

Function "identity" can refer to how functions occupy places in memory and sometimes you can have two functions that refer to the same place in memory and sometimes you can have two functions that you think are the same but they're actually different places in memory. For example:

```js
// Here is a simple function
const someFunction = () => {}

// If we assign it to a new variable name, we now have two functions
// referring to the same thing in memory:
const a = someFunction

// `a` is just referring to the same place as `someFunction` now:
a === someFunction // true
```

But when a function is created inside of another function, it will get a new "identity", or place in memory each time it's created:

```js
// When makeFunction is called, it creates a brand new copy of this arrow
// function and returns it:
function makeFunction() {
  return () => {}
}

// So even though it seems like `f1` and `f2` would be the same, they're not
// from a "where they live in memory" standpoint
const f1 = makeFunction();
const f2 = makeFunction();
f1 === f2) // false
```

The reason this happens is because each time `makeFunction` is called it gets a new scope and therefore the creation of the (arrow) function belongs to a different scope each time. The end result is there are now two different functions returned, even though they look the same.

Another term that gets used with closure sometimes is how variables sometimes get "captured" with closure.

In this example, the `makeClosureFunction` does just that, it returns a function that has closure over the `arg`. The `f1` and `f2` variables are references to that function returned, but each one "captures" the scope and remembers what it was at the time the function was created:

```js
function makeClosureFunction(arg) {
  return function() {
    return arg;
  };
}

const f1 = makeClosureFunction(5);
const f2 = makeClosureFunction(10);

f1()); // 5
f2()); // 10
```

For more reading material:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
