const fn = require("./fn");

test("thorw처리했으니 무조건 에러'xx'", () => {
  expect(() => fn.throwErr()).toThrow("xx");
}); // 특정에러인가 -> 'xx'부분
