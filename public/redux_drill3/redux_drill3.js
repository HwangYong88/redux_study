const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers");
const { addPost } = require("./action/post");
const { logIn, logout } = require("./action/user");

// 컴포넌트 안에서만 혹은 부모자식 관계정도만 스테이트로 해결하면좋고,
// 그외 3개이상 컴포넌트 쓸거면 리덕스가 편하다.

// 현실적인 예제 : 로그인
// 각 리듀서로 나눌때 initialState도 같이 나누어서 넣어줘야한다.
const initialState = {
  user: {
    isLogginIn: true,
    data: null,
  },
  posts: [],
  comment: [],
  favorites: [],
  hisotry: [],
  likes: [],
  follows: [],
};

// 리덕스의 미들웨어 자리 : 디스패치와 리듀서 사이<중요<인핸서
// 미들웨어 대표적: redux-thunk , redux-saga
// 공식사이트 예제 : 로깅하는 미들웨어
// 미들웨어는 보통 삼단함수(아래와 동일한 의미)
// function firstMiddleware(store){
//   return function(next){
//     return function(action){
//     }
//   }
// }
const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action); // 추가한 기능
  // 디스패지 전에 추가할기능 자리
  dispatch(action); // 기본동작
  // 디스패지 후에 추가할기능 자리
  console.log("액션 끝");
  // 이것을 이용해서 비동기 처리도 할 수 가 있다
};

// 리덕스 썽크 . 코드 이것밖에 없음
// 밑에 if로 왜 나누었나 : 동기와 비동기. 동기일때(아래)는  바로 함수액션을 실행한다. 비동기(위) 함수로 온 액션을 썽크가 실행해줌
const thunkMiddleware = (stroe) => (dispatch) => (action) => {
  if (typeof action === "function") {
    // 비동기(서버 한번 거치거나 시간이 걸리는 작업)
    // 비동기인 경우에는 액션을 함수로 만들어 주겠다
    return action(store.dispatch, store.getState);
    // 첫번째인자:디스패치, 두번째인자:겟스테이트
  }
  return dispatch(action); // 기본동작
};
// 미들웨어는 여러개 쓸쑤 있다.
const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);
// 또는 const enhancer = compose(applyMiddleware()); 옛날방식

const store = createStore(reducer, initialState, enhancer);
console.log("1", store.getState());

store.subscribe(() => {
  console.log("changed"); // 화면바꿔주는코드 여기서
});

// dispatch 파트-------------------------------------------------------------------
console.log("1st", store.getState());

store.dispatch(
  logIn({
    id: 1,
    name: "yong",
    admin: true,
  })
);
console.log("2nd", store.getState());

// 게시물1
store.dispatch(
  addPost({
    userId: 1,
    id: 1,
    content: "hi - redux",
  })
);
// 게시물2
store.dispatch(
  addPost({
    userId: 1,
    id: 2,
    content: "second redux",
  })
);
console.log("3rd", store.getState());

store.dispatch(logout());
console.log("4th", store.getState());

// 블로그 퍼옴 : 리덕스 미들웨어
// 리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능입니다. Context API 또는 MobX를 사용하는것과 차별화가 되는 부분이죠.
// 리덕스 미들웨어를 사용하면 액션이 디스패치 된 다음, 리듀서에서 해당 액션을 받아와서 업데이트하기 전에 추가적인 작업을 할 수 있습니다.
// 여기서 언급한 추가적인 작업들은 다음과 같은 것들이 있습니다.
// ・특정 조건에 따라 액션이 무시되게 만들 수 있습니다.
// ・액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있습니다.
// ・액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있습니다.
// ・특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있습니다.
// ・특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있습니다.
// 보통 리덕스에서 미들웨어를 사용하는 주된 사용 용도는 비동기 작업을 처리 할 때 입니다.
// 예를 들어 리액트 앱에서 우리가 만약 백엔드 API 를 연동해야 된다면, 리덕스 미들웨어를 사용하여 처리하곤 하죠.
// 리덕스 미들웨어는 누구든지 만들어서 사용 할 수 있습니다만,
// 일반적으로는 리덕스 미들에웨어 라이브러리를 설치하여 사용합니다.
// 비동기 작업에 관련된 미들웨어 라이브러리는 redux-thunk, redux-saga, redux-observable, redux-promise-middleware 등이 있습니다.
// redux-saga와 redux-observable의 경우엔 특정 액션을 모니터링 할 수도 있으므로,
// 특정 액션이 디스패치됐을때 원하는 함수를 호출하거나, 또는 라우터를 통해 다른 주소로 이동하는 것이 가능합니다.
// 이 튜토리얼에서는 미들웨어를 사용하여 비동기작업을 처리하는 방법을 배우게 될 때,
// redux-thunk와 redux-saga만을 다루게 됩니다(이 두 라이브러리가 가장 많이 사용됩니다).
