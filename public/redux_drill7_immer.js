// npm i redux-devtools-extension -D

// connect가져오기
const mapStateToProps = (state) => ({
  user: state.user, // reselect도 있지만 안씀
});

const mapDipatchToProps = (dispatch) => ({
  dispatchLogin: (data) => dispatch(login(data)), // 부를 때는 this.props.dispatchLogin
  dispatchLogout: () => dispatch(logout()), // 부를 때는 this.props.dispatchLogout
});
export default connect(mapStateToProps, mapDipatchToProps)(app);

// 하이오더컴포넌트(hoc) 또는 고차컴포넌트
// 고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수입니다. 즉 컴포넌트를 인자로 받거나 반환하는 함수
// redux의 connect 또는 realy의 createContainer 등도 고차함수

// useSelector
// useSelector를 사용한 함수에서 리덕스 스토어의 상태값이 바뀐 경우
// ( 버튼 클릭 등의 이벤트를 통해 액션이 실행되어 상태값이 변경된 경우) 바뀐 스토어의 상태값을 다시 가져와 컴포넌트를 렌더링 시킨다.

// connect 함수는 리액트 앱의 하위 컴포넌트에서 redux store를 접근하는 것을 가능하게 해주는 역할을 한다.
// 이 함수를 이용해서 컴포넌트 단에서 redux store에 접근하고 액션을 호출 할 수 있게 된다.

// 1. Provider -----------------------------------------------------------------------------------------
// 상위 컴포넌트 에서는 provider 처리
//  configureStore() 함수를 통해 store를 생성하고 Provider 태그에 store를 속성값으로 넣는다.
// 이러면 하위에 추가되는 component에서 redux store를 바라볼 수 있는 창구가 만들어진다.

// ex))) const jsx = ( <Provider store={store}> <BlogMain /> </Provider> );

// 2. connect -----------------------------------------------------------------------------------------
// 하위 컴포넌트 단에서는 Provider에서 제공하는 store 함수를 connect 함수를 통해서 받아온다.
// 함수 형식이든 클래스 형식이든 받는 방식은 동일하다.
// 클래스 형식 컴포넌트를 export 할 때 connect 함수를 사용하고 첫번째 인자에 mapStateToProps 함수를 넣었는데
// redux store에 있는 값을 컴포넌트에 어떻게 넘겨줄지 세팅하는 작업이다.
// 넘겨 받은 값은 component의 props에 들어가서 호출 할 수 있다.

// const mapStateToProps = (state) => { return { text: state.text, number: state.number } };
// export default connect(mapStateToProps)(BlogMain);

// immer 라이브러리
// 그리고 produce 함수를 사용 할 때에는
// 첫번째 파라미터에는 수정하고 싶은 상태,
// 두번째 파라미터에는 어떻게 업데이트하고 싶을지 정의하는 함수
// 를 넣어줍니다.

// 두번째 파라미터에 넣는 함수에서는 불변성에 대해서 신경쓰지 않고 그냥 업데이트 해주면 다 알아서 해줍니다.
import produce from "immer";

const state = {
  number: 1,
  dontChangeMe: 2,
};

// immer 는 produce로 보통 쓴다.
// state: 수정하고 싶은 상태
// (draft) => {draft.number += 1;} : 업데이트에 사용할 함수
const nextState = produce(state, (draft) => {
  draft.number += 1;
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
