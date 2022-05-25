async function getName() {
  return "test";
}

getName().then((name) => {
  console.log(name);
});

async function getName2() {
  return Promise.resolve("test2");
}

getName2().then((name) => {
  console.log(name);
});

// 함수내부에 에러발생시 리젝트만 출력
async function getName3() {
  throw new Error("err...");
}

getName3().catch((err) => {
  console.log(err);
});

// await: await는 async내부에서만 사용할수있다. 아니면 에러
function getName4(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

async function showName() {
  const result = await getName4("Mike");
  console.log(result);
}
console.log("시작");
showName();

// drill4의 프로미스 예제를 async/await로 바꿔보기
const f1_1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 주문 완료:예제3");
    }, 3000);
  });
};

const f2_1 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 주문 성공:예제3");
    }, 3000);
  });
};

const f3_1 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 주문 완료:예제3");
    }, 3000);
  });
};

async function drill6() {
  const result1 = await f1_1();
  console.log("texxxxxxx");
  const result2 = await f2_1(result1);
  const result3 = await f3_1(result2);
  console.log(result3);
}
console.log("예제 테스트 시작");
drill6();
