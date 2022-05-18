const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers");
const { addPost } = require("./action/post");
const { login, logout } = require("./action/user");

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
//     return function(acyion){
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

const thunkMiddleware = (stroe) => (dispatch) => (action) => {
  if (typeof action === "function") {
    // 비동기
    // 비동기인 경우에는 액션을 함수로 만들어 주겠다
    return action(store.dispatch, store.getState);
  }
  return dispatch(action); // 기본동작
};
// 미들웨어는 여러개 쓸쑤 있다.
const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);
// 또는 const enhancer = compose(applyMiddleware());

const store = createStore(reducer, initialState, enhancer);
console.log("1", store.getState());

store.subscribe(() => {
  console.log("changed"); // 화면바꿔주는코드 여기서
});

// dispatch 파트-------------------------------------------------------------------
console.log("1st", store.getState());

store.dispatch(
  login({
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
