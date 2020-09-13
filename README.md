# Resultify

Function in JavaScript could return values, in the meantime it would also throw errors if it cannot produce the caller expected value for some reasons whose details would be carried by those errors, if the errors occur then the caller should use a `try-catch` statement to capture the potential errors otherwise the program will be interrupted by the runtime to prevent it from running into the unpredictable state.

However `try-catch` is slightly inflexible since it will force the program to use an explicit control-flow branch in its `catch` clause. For letting the errors handling to be more flexible, this module could encapsulate the return value together with the coming error to become a boxing value called `Result`

## Usage

```$
npm i @hsiaosiyuan0/resultify
```

```ts
import { resultify } from "@hsiaosiyuan0/resultify";

async function fn() {
  // do some async work
}

const resp = await resultify(fn());
// apply the early-return pattern
if (resp.e) return;

// consuming the result
console.log(resp.r);
```

for the synchronous task we should convert to be its lazy-compute form:

```ts
import { resultify } from "@hsiaosiyuan0/resultify";

function fn() {
  // do some sync work
}

const resp = await resultify(() => fn());
if (resp.e) return;
```

for some situations we want rethrow the error:

```ts
const resp = await resultify(fn());
if (resp.e) throw resp.e;
```

or we could use the `take` method to shorten above code:

```ts
const resp = await resultify(fn());
console.log(resp.take());
```

since `take` will unboxing the result then either return the value held by the field `r` or rethrow the error held by the field `e` if it's not `null`, we could also use `try-catch` to recover the program state as normal:

```ts
const resp = await resultify(fn());
try {
  console.log(resp.take());
} catch (e) {
  console.error(e);
}
```
