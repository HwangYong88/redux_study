// action 파트-------------------------------------------------------------------
const addPost = (data) => {
  return {
    type: "ADD_POST",
    data,
  };
};

module.exports = {
  addPost,
};
