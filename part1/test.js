const fn = require("./index");
const assert = require("assert");

describe("Split name with , and &", () => {
  it("should return empty string", () => {
    assert.equal(fn([]), "");
  });

  it("should return given value", () => {
    assert.equal(fn([{ name: "Bart" }]), "Bart");
  });

  it("should return given value separated with &", () => {
    assert.equal(fn([{ name: "Bart" }, { name: "Lisa" }]), "Bart & Lisa");
  });

  it("should return given value separated with , and &", () => {
    assert.equal(
      fn([{ name: "Bart" }, { name: "Lisa" }, { name: "Maggie" }]),
      "Bart, Lisa & Maggie"
    );
  });
});
