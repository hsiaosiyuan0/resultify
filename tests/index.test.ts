import expect from "expect";
import { resultify } from "../src";

describe("resultify", () => {
  it("async success", async () => {
    async function fn() {
      return 1;
    }

    const resp = await resultify(fn());
    expect(resp.r).toBe(1);
  });

  it("async failure", async () => {
    async function fn() {
      throw new Error("unexpected error");
    }

    const resp = await resultify(fn());
    expect(resp.r).toBeNull();
    expect(resp.e).not.toBeNull();
  });

  it("async take", async () => {
    async function fn() {
      return 2;
    }

    const resp = await resultify(fn());
    const r = resp.take();
    expect(r).toBe(2);
  });

  it("async take rethrow", async () => {
    async function fn() {
      throw new Error("unexpected error");
    }

    const resp = await resultify(fn());
    expect(() => resp.take()).toThrowError("unexpected error");
  });

  it("sync success", async () => {
    function fn() {
      return 1;
    }

    const resp = await resultify(() => fn());
    expect(resp.r).toBe(1);
  });

  it("sync failure", async () => {
    function fn() {
      throw new Error("unexpected error");
    }

    const resp = await resultify(() => fn());
    expect(resp.r).toBeNull();
    expect(resp.e).not.toBeNull();
  });
});
