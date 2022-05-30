// jest 함수를 모으는곳
const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age, gender: undefined }),
  throwErr: () => {
    throw new Error("xx");
  },
  // 비동기 테스트
  getName: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 1000);
  },
  getAge: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(age);
      }, 1000);
    });
  },
};
module.exports = fn;
