const { combineReducers } = require("redux");
const userReducer = require("./user");
const postReducer = require("./post");

// 리듀서를 합쳐주는 combieReducers
module.exports = combineReducers({
  user: userReducer,
  post: postReducer,
});
