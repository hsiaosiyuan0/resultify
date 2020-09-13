export type Success<T> = { r: T; e: null; take: () => T };
export type Failure<E> = { r: null; e: E; take: () => never };

export type Result<T, E = Error> = Success<T> | Failure<E>;

export async function resultify<T, E = Error>(
  p: Promise<T>
): Promise<Result<T, E>> {
  return p
    .then((r) => {
      return { r, e: null, take: () => r };
    })
    .catch((e) => {
      return {
        r: null,
        e,
        take: () => {
          throw e;
        },
      };
    });
}
