const { createStore } = require("redux");

// 컴포넌트 안에서만 혹은 부모자식 관계정도만 스테이트로 해결하면좋고,
// 그외 3개이상 컴포넌트 쓸거면 리덕스가 편하다.
//

// 현실적인 예제 : 로그인
// store파트-------------------------------------------------------------------
const reducer = (prevState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        user: null,
      };
    case "ADD_POST":
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    default:
      return prevState;
  }
};
const initialState = {
  user: null,
  posts: [],
};

const store = createStore(reducer, initialState);
console.log("1", store.getState());

store.subscribe(() => {
  console.log("changed"); // 화면바꿔주는코드 여기서
});

// action 파트-------------------------------------------------------------------
const login = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

const logout = () => {
  return {
    type: "LOG_OUT",
  };
};

const addPost = (data) => {
  return {
    type: "ADD_POST",
    data,
  };
};

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
