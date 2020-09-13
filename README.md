# to-result

Function in JavaScript could return values, in the meantime it would also throw errors if it cannot produce the caller expected value for some reasons whose details would be carried by those errors, if the errors occur then the caller should use a `try-catch` statement to capture the potential errors otherwise the program will be interrupted by the runtime to prevent it from running into the unpredictable state.

However `try-catch` is a little bit inflexible since it will force the program to use an explicit control-flow branch in its `catch` clause. For letting the errors handling to be more flexible, this module could encapsulate the return value together with the coming error to become a boxing value called `Result`

## Usage

```$
npm i to-result
```

```ts
import { resultify } from "to-result";

async function fn() {
  // do some async work
}

const resp = await resultify(fn());
// apply the early-return pattern
if (resp.e) return;

// consuming the result
console.log(resp.r);
```

for some situation you want rethrow the error:

```ts
const resp = await resultify(fn());
if (resp.e) throw resp.e;
```

or you could use the `take` method to shorten above code:

```ts
const resp = await resultify(fn());
console.log(resp.take());
```

since `take` will unboxing the result then either return the value held by the field `r` or rethrow the error held by the field `e` if it's not `null`, you could also use `try-catch` as normal:

```ts
const resp = await resultify(fn());
try {
  console.log(resp.take());
} catch (e) {
  console.error(e);
}
```
