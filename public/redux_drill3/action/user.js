// action 파트-------------------------------------------------------------------
const logIn = () => {
  // 비동기액션 크리에이터의 경우(함수를 리턴)
  return (dispatch, getState) => {
    dispatch(logInRequest());
    setTimeout(() => {
      dispatch(logInSuccess());
    }, 2000);
  };
};

const logInRequest = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data: {
      id: "yong",
      password: "pw",
    },
  };
};

const logInSuccess = () => {
  return {};
};

const login = (data) => {
  // 동기액션 크리에이터의 경우(객체를 리턴)
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

module.exports = {
  login,
  logout,
};
