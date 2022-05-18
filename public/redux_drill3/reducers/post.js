const initialState = [];

// store 파트------------------------------------------

const postReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...prevState, action.data];
    default:
      return prevState;
  }
};

// 리듀서를 합쳐주는 combieReducers
module.exports = postReducer;
