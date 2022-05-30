const fn = require("./fn");

test("이름과 나이를 받아서 객체를 반환1", () => {
  expect(fn.makeUser("Mike", 30)).toBe({
    name: "Mike",
    age: 31,
  });
}); // 나이가 달라서 실패

// 객체나 배열은 toEqual을 사용하지 않으면 실패가 뜸
test("이름과 나이를 받아서 객체를 반환2", () => {
  expect(fn.makeUser("Mike", 30)).toEqual({
    name: "Mike",
    age: 30,
  });
}); // 성공

test("이름과 나이를 받아서 객체를 반환3", () => {
  expect(fn.makeUser("Mike", 30)).toStrictEqual({
    name: "Mike",
    age: 30,
  });
}); // 엄격한 이퀄 실패. gender:undefined부분이 에러.
// 엄격히 테스트 하려면 toStrictEqual이 좋을것
