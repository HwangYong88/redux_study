const { createStore } = require("redux");

// 제로초 리덕스 강좌(조금 옛날)
// js부분은 코드런너로 실행 (Ctrl+Alt+N)

// contextAPI에 편의기능을 더 붙이면 리덕스가 된다.
// 리덕스의 특징 단방향
// 스토어를 중심으로 생각
// 부모에서 자식바꿈 : 프롭스
// 자식에서 부모바꿈 : 불가능

// 리덕스를 쓰면
// 	1. 히스토리가 남아서 에러를 찾기가 쉬워진다.
// 	2. 타임머신기능이 있어서 돌아가기기능 편리
// 	3.

// 스테이트 : 액션 : 디스패치 :(미들웨어): 리듀서(새로운 객체를 생성해서 스테이트에 덮어씌움)
// 리덕스 공식문서 보기 -> 위에부터 천천히 첨부터끝까지 정독 , api레퍼런스는 읽지말기(함수 하나하나의 설명), 관계를 그림판으로 그려보기,

// store파트-------------------------------------------------------------------
// 리듀서의 역할 : 새로운 스테이트를 만들어주기
// case에서 오타로 적절한것을 찾지못할때를 대비해서 디폴트에 값넣어주기.
const reducer = (prevState, action) => {
  switch (action.type) {
    case "CHANGE_COMP_A":
      return {
        // 스프레드함수
        ...prevState,
        compA: action.data,
      };
    case "CHANGE_COMP_B":
      return {
        ...prevState,
        compB: action.data,
      };
    case "CHANGE_COMP_C":
      return {
        ...prevState,
        compC: action.data,
      };
    default:
      return prevState;
  }
};
const initialState = {
  compA: "a",
  compB: 12,
  compC: null,
};
const store = createStore(reducer, initialState);
console.log("1", store.getState());

// 데이터를 리덕스로 바꾸면 화면은 언제바뀌나요?
// 밑의 subscribe함수가 변화를 감지하면 출력함
store.subscribe(() => {
  console.log("changed"); // 화면바꿔주는코드 여기서
});

// action 파트-------------------------------------------------------------------
const changeCompA = (data) => {
  return {
    type: "CHANGE_COMP_A",
    data,
  };
};

// dispatch 파트-------------------------------------------------------------------
store.dispatch(changeCompA("b"));
console.log("2", store.getState());
