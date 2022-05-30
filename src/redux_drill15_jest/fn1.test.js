// npm test하면 프로젝트내의 모든 테스트 파일을 찾아서 테스트
// .test.js 또는 __test__
// 특정 파일만 테스트하고싶으면 파일명 또는 경로를 기입할것

const fn = require("./fn");
test("1은 1이야", () => {
  expect(1).toBe(1);
});
// expect에는 검증할 값 , toBe에는 기대결과

test("2더하기 3은 5", () => {
  expect(fn.add(2, 3)).toBe(5);
});

test("3더하기 3은 5", () => {
  expect(fn.add(3, 3)).toBe(5);
});

// 위와같이 테스트를 만들고 npm fn1.test.js로 실행(src위에서)
// 결과는 아래와같이 나왔다.
// FAIL  src/redux_drill15_jest/fn.test.js
// √ 1은 1이야 (2 ms)
// √ 2더하기 3은 5 (1 ms)
// × 3더하기 3은 5 (3 ms)

// ● 3더하기 3은 5

//   expect(received).toBe(expected) // Object.is equality

// Tests:       1 failed, 2 passed, 3 total
// Snapshots:   0 total
// Time:        1.582 s
// Ran all test suites matching /fn.test.js/i.

test("3더하기 3은 5가 아니야", () => {
  expect(fn.add(3, 3)).not.toBe(5);
});

// matcher에 대해서
// toBe = toEqual;
