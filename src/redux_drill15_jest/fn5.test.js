// 비동기 코드의 테스트

const fn = require("./fn");
test("콜백함수는 done을 줘야해", (done) => {
  function callback(name) {
    expect(name).toBe("Mike");
    done();
  }
  fn.getName(callback);
}); // done을 넣어주지 않으면 3초안기달리고 끝나버림

test("promise는 리턴을 줘야해", () => {
  return fn.getAge().then((age) => {
    expect(age).toBe(30);
  });
  //return expect(fn.getAge()).resolves.toBe(30); 같은 결과
}); // return 을 넣어줘야함

test("async await 로 해보자", async () => {
  await expect(fn.getAge()).resolves.toBe(30);
});
