// mock function
// jest.fn으로 목함수 생성
const mockFn = jest.fn();

test("함수는 2번호출됩니다", () => {
  mockFn();
  mockFn(1);
  expect(mockFn.mock.calls.length).toBe(2);
});

test("2번째로 호출된 함수에 전달된 첫번째 인수는 1 입니다", () => {
  mockFn();
  mockFn(1);
  expect(mockFn.mock.calls[1][0]).toBe(1);
});

function forEachAdd1(arr) {
  arr.forEach((num) => {
    mockFn(num + 1);
  });
}

forEachAdd1([10, 20, 30]);
test("함수 호출은 3번 됩니다", () => {
  expect(mockFn.mock.calls[0][0]).toBe(11);
}); //원래는 되야하는데 왜안되냐

// toBeCalledWith
// toBeCalledWith(parameter) 해당 파라미터를 가진 함수가 한번이라도 호출된 적이 있으면 통과하는 함수이다.

// lastCalledWith
// lastCalledWith(parameter) 해당 파라미터를 가진 함수가 가장 마지막에 호출되었는지 체크해서 통과시키는 함수이다.
