import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

// 리액트 컴포넌트 + 스냅샷 테스트 - 자바스크립트 테스트 프레임워크
const user = {
  name: "Mike",
  age: 30,
};

test("hello라는 글자가 포함되는가?", () => {
  render(<Hello user={user}></Hello>); // user를 프롭스로전달
  const helloEl = screen.getByText(/Hello/i);
  expect(helloEl).toBeInTheDocument();
});

test("snapshot : name 있음", () => {
  const el = render(<Hello user={user} />);
  expect(el).toMatchInlineSnapshot();
});
// 스냅샷 실패의 경우에는 u를 눌러서 스냅샷을 업데이트
// 시간을 테스트 하는등 값이 변경되는 경우에는 mock을 사용해서 값을 저장해놓고 진행
