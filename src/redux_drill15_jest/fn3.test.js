const fn = require("./fn");

// toBeNull
// toBeUndefined
// toBeDefined

test("널은널", () => {
  expect(null).toBeNull();
}); // 통과

// toBetruthy
// toBeFalsy
test("0은 false", () => {
  expect(fn.add(1, -1)).toBeFalsy();
}); // 통과

// toBeGreaterThan
// toBeGreaterThanOrEqual
// toBeLessThan
// toBeLessThanOrEqual
test("id는 10자 이하여야 한다", () => {
  const id = "the balck panther";
  expect(id.length).toBeLessThanOrEqual(10);
}); // 실패

test("컴퓨터는 소숫점 계산을 잘못함 때문에 tobe가아닌 클로즈 사용", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
}); // 성공

test("hello world에 a라는 글자가 있나요", () => {
  expect("hello world").toMatch(/h/);
}); // 정규표현식 이므로 나중에 다시 공부

test("리스트에 mike있나", () => {
  const user = "mike";
  const list = ["tom", "xion", "dog", "mike"];
  expect(list).toContain(user);
}); // 성공
