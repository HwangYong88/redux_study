// action 파트-------------------------------------------------------------------
const logIn = (data) => {
  // redux-thunk는 뭐하는 미들웨어일까?
  // : 우리 액션 생성 함수가 뭘 반환한다고 했었죠? 객체 반환하죠.
  // redux-thunk는 객체 대신 함수를 생성하는 액션 생성함수를 작성할 수 있게 해줍니다!
  // (함수는 어떤 동작을 하는 코드의 모음입니다!)
  // 그게 왜 필요하냐구요? 리덕스는 기본적으로는 액션 객체를 디스패치합니다!
  // → 즉, 함수를 생성하면 특정 액션이 발생하기 전에 조건을 주거나,
  // 어떤 행동을 사전에 처리할 수 있겠죠!!
  return (dispatch, getState) => {
    // 인자는 thunkMiddleware의 if문 안을 참조
    // 비동기액션 크리에이터의 경우(함수를 리턴)
    // 객체를 리턴할때는 일반적인 리덕스이고
    // 함수를 리턴할때는 자동으로 미들웨어랑 연결인가?
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(logInSuccess({ userId: 1, nickname: "yong_nick" }));
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

const logInRequest = (data) => {
  // 동기액션의 경우(객체를 리턴)
  return {
    type: "LOG_IN_REQUEST",
    data: {
      id: "yong",
      password: "pw",
    },
  };
};

const logInSuccess = (data) => {
  return { type: "LOG_IN_SUCCESS", data };
};

const logInFailure = (err) => {
  return { type: "LOG_IN_FAILURE", err };
};

const logout = () => {
  return {
    type: "LOG_OUT",
  };
};

module.exports = {
  logIn,
  logout,
};
