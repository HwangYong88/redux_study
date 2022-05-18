// initialState는 기본값(초기값) <<<< 이부분 이해안감
const initialState = {
  isLogginIn: false,
  data: null,
};

// store 파트------------------------------------------
const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        data: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        isLogginIn: false,
        data: null,
      };
    default:
      return prevState;
  }
};

// 리듀서를 합쳐주는 combieReducers
module.exports = userReducer;
