// 테스트 전후에 할수있는 작업 , 핼퍼함수
const fn = require("./fn");
let num = 0;

// test("0더하기 1은 1", () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1);
// });

// test("0더하기 2은 2", () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1);
// });

// test("0더하기 3은 3", () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1);
// });

// 값이 계속 쌓여서 에러 나므로 값을 초기화 해주는 beforeEach
// 테스트 직후에 해주는 afterEach도 있다.
beforeEach(() => {
  num = 0;
});

test("0더하기 1은 1", () => {
  num = fn.add(num, 1);
  expect(num).toBe(1);
});

test("0더하기 2은 2", () => {
  num = fn.add(num, 1);
  expect(num).toBe(1);
});

test("0더하기 3은 3", () => {
  num = fn.add(num, 1);
  expect(num).toBe(1);
});

// 만약 시간이 걸리는 테스트라면 어떻게 하나.
// describe로 한번에 묶고, beforeAll, afterAll로 시작전, 종료후
// 처리할 것들은 넣어준다 : 예) 서버 연결. 서버 연결종료
describe("", () => {
  beforeAll(async () => {
    user = await fn.connectUserDb();
  });
  afterAll(() => {
    return fn.disConnectDb();
  });
});

// 실행순서를 잘기억하자
beforeAll(); //1
beforeEach(); //2//6
afterEach(); //4//10
afterAll(); //12

test()//3

describe(){
    beforeAll();//5
    beforeEach();//7
    afterEach();//9
    afterAll();//11

    test2()//8
}

// test.only를 하면 only가붙은 테스트만 실행
// test.skip을 하면 skip가붙은 테스트를 제외