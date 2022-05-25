// 리덕스 툴킷
// 리덕스 정보 볼 수 있는 사이트 : 에어비앤비
// 리덕스에서 자주쓰는 기능이 들어있는 라이브러리. 썽크, 싸가, 이머, 데브툴 안써도 툴킷쓰면 안에 다들어 있어서 끝남
// 리액트 핫로더 -> 리액트 리프레쉬, 리액트 리프레시 웹팩 플러그인로 대체
// import hot from 'hot-loader-xxxx' 도 사라짐. 저절로 적용됨
// createSlice와 createAsyncThunk 거의 두개만 사용함
// 이니셜 스테이트는 이제 넣을필요없고 ssr전용이됨(서버사이드 에서 데이터 올때만 쓰인다)

const userReducer = require("./redux_drill3/reducers/user");

// 1. redux-toolkit의 createSlice---------------------------------------------------------------------------------------------
// createSlice는 Redux Toolkit에서 가장 크게 변한 부분 중 하나로, 
// createSlice를 이용하면 Action과 Reducer를 한번에 정의할 수가 있다.
const { createSlice } = require("@reduxjs/toolkit");
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      logOut(state.action){
          state.data = null;
      }
  }, // 리듀서는 동기적, 내부용, 액션을 만들 필요 없음
  extraReducers: {}, 
  // extra리듀서는 비동기적, 외부용, 액션 만들어야함
});

module.exports = userSlice;

//ex) 리듀서의경우 (다른곳에서 쓸때)(동기)
const onLogout = useCallback(()=>{
    dispatch(userSlice.actions.logOut());
},[])

// 2. redux-toolkit의 CreateAsyncThunk ---------------------------------------------------------------------------------------------
// Redux는 동기적인 로직만 처리 가능 하기 때문에, 서버 통신과 같은 비동기 통신을 위해서는 외부 library를 사용해야 한다. 
// Redux Toolkit은 비동기 통신을 위한 library인 thunk를 내장하고 있다. 
// createAsyncThunk API를 이용하면 thunk를 이용해 비동기 통신을 처리할 수 있다.
// createAsyncThunk는 두가지의 parameter를 인자로 받는데, 
// 첫번째 인자는 action type이고 
// 두번째 인자로는 처리할 비동기 로직을 담은 callback 함수이다.
// Action이 dispatch되면 thunk action 생성자는 callback promise를 실행하고 reducer에서 반환된 promise, 
// 즉 promise의 결과에 기반한 action을 실행한다.
// 따라서 thunk 사용시 reducer에서 promise 시작, 성공, 실패에 따른 3가지 action을 정의해 주어야 한다!
// thunk action이 dispatch 되었을때, thunk가 하는 행동을 순차적으로 정리해보면 다음과 같다.

// 1. pending action dispatch
// 2. 전달된 callback 함수 실행
// 3. promise 성공,실패에 따라 fulfilled or rejected action을 dispatch
// 4. 3단계에서 dispatch된 action을 기반으로 fullfilled promise 반환

const { createAsyncThunk } = require("@reduxjs/toolkit");
const { useSelector } = require("react-redux");

// action과 callback함수 전달
// 2) thunk는 fetchUserById action을 실행하고 비동기 로직을 처리
// promise에 결과에 따라 fulfilled, reject을 반환
const fetchUserById = createAsyncThunk( 
  'users/fetchByIdStatus',//액션 이름
  async (userId, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers: 
// 3) reducer에서 받아 적절한 action을 처리
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  // 방식 1: map Object notation 방식
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.pending]: (state, action) => {
    // 객체 다이나믹 속성
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    
    [fetchUserById.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities.push(action.payload)// 액션 데이터 정보는 모두 payload로 통합. push가 가능한 이유는 immer가 내장되어있음
        state.currentRequestId = undefined
      }
    },
    
    [fetchUserById.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    }
    // 방식2: builder callback notation
    // const users = createSlice({
    //     name: 'usersReducer',
    //     initialState,
    //     reducers: {},
    //     extraReducers: (builder) => { // 빌더를 쓰고 addCase를 연달아 붙이는 방식. 타입스크립트할때는 타입추론 하니까 이것이 편하다
    //         builder
    //             .addCase(getUsersThunk.pending, (state, action) => ({
    //                 ...state,
    //                 loading: true,
    //             }))
    //             .addCase(getUsersThunk.fulfilled, (state, action) => ({
    //                 ...state,
    //                 loading: false,
    //                 data: action.payload,
    //             }))
    //             .addCase(getUsersThunk.rejected, (state, action) => ({
    //                 ...state,
    //                 loading: false,
    //                 error: action.error,
    //             }));
    //     },
    // 그외 addMatcher(action별 공통업무), addDefault(스위치문의 기본) 를 사용하기도 함
    // });
  }
})

// Later, dispatch the thunk as needed in the app 
// 1) App에서 fetchUserById라는 thunk 함수를 dispatch하면
dispatch(fetchUserById(123))

// 리덕스 데브 툴스---------------------------------------------------------------------------------------------
// 리퀘스트id : 매번 어떤 요청인지 확인하기위해서 랜덤으로 생성.
// 성공시 : action.payload , 실패시 action.error

// 리덕스를 쓰지 말아야 할때---------------------------------------------------------------------------------------------
// 1. 인풋: 모든글자 하나하나 입력할때마다 디스패치를 걸면 의미없으므로, onBlur(완성될때만 실행)쓰거나 onSubmit에 걸거나 
// 예시:구조분해할당을하면 쓸데없는 리렌더링이 늘어나버림
// const {email, password} = useSelector((state)=> state.user) // 이렇게 합쳐서 쓰는게 안좋은이유. 하나바뀔때 모두 렌더링 되버림
// 따라서 const email = useSelector((state)=> state.user.email), const password = useSelector((state)=> state.user.pw) 로 나누는게 좋음
// 리턴하는게 객체가아닌 불린, 숫자 등 원시값이 좋음
// 프론트의 최적화 : 체감이 될때 아니면 굳이 처음부터 할 필요는 없다. 왜냐 변화에 적응하기 힘들다.

// 2. 비동기
// 하나의 컴포넌트 안에서 처리 하고 끝날 수 있는것. : 리덕스로 보내면 안됨
// 보내면 리덕스가 점점 복잡해진다.
// 비동기 요청의 경우에는 isloginLoding, loginError, isLoginDone 등등 비동기 액션이 이름짓기도 고민이고 숫자도 많아져서 불편.
// 버튼을 여러번 눌러서 요청이 많아지면 귀찮아짐.
// loadings, errors, dones 이런식으로 여러개를 넣을 수 있게 많드는게 좋다. 그후에 고유한 값을 추가 const id = new Date().valueof();

// createSelector(reselect) == usememo---------------------------------------------------------------------------------------------
// createSelector 컴포넌트 윗단에서 메모리제이션 하는 느낌

// 뭐 굳이 createSelector를 사용하지않고 useMemo를 사용해도 됩니다만
// , createSelector에서 만든 새로운 state값을 여러 곳에서 사용을 한다면
// useMemo를 사용할 때 계산해야하는 함수들을 만들고, 그 함수에다가 useMeno를 작성해줘야하는 불편함이 있지만
// , createSelector는 state값으로 새로 만들어주는 거기 때문에 코드량이 많이 줄어드는 장점을 가지고 있고
// , 전체 state값을 가져올 필요 없이 특정 state값만 가지고 올수도 있습니다.
// ex)
const sumPriceSelector = createSelector(
    priceSelector,
    (prices) => prices.reduce((a,c)=>a+c,0)// prices의 값이 바뀔때 prices.reduce((a,c)=>a+c,0)를 재실행
)
// createSelector를 여러 컴포넌트 간에 공유하고싶으면
// 함수로 감싼담에 한번불러서 크리에이트 하고 새로만들고 써야함 왜냐? 한쪽꺼만 캐싱되고 문제생김

// Redux - selector 패턴과 reselect------------------------(위의 내용과 동일하지만 어렵기 때문에 더욱 길게 추가)-----------------------------

// Selector란?
// redux는 하나의 store를 통해 어플리케이션의 state를 관리한다. 
// 우리는 setter 와 같이 action/reducer를 통해 state를 변경하고 관리한다. 
// selector는 getter와 같은 느낌이다. selector를 사용했을 때 장점과 왜 써야하는지에 대해 알아보자.

// Selector란?
// Selector는 state에서 필요한 데이터를 가져오거나, 계산하여 가져오는 역할을 한다. selector를 써야할 이유는 여러가지가 있다.
// 데이터에 대한 계산을 selector가 해주어서, redux가 적은 양의 필요한 데이터만을 가지고 있게 도와준다.
// state를 가져오는 컴포넌트들과 state의 구조 사이 한 층(selector)을 두어 구조가 바뀌어도 연관된 모든 컴포넌트를 바꿀 필요 없이, selector만 바꿔주면 된다.
// reselect를 이용할 경우 memoization 적용하여 불필요한 재계산을 방지하여 효율적이다.
// 하나씩 알아보도록 하자.
// 예를 들어,

state = {
  todos: [
    {
      description: 'do my homework',
      isCompleted: false,
    },
    ...,
  ],
};
// 위와 같은 State가 있을 때, 완료된 ( isCompleted: true )인 todo들을 가져오고자 한다. 여러가지 방법이 있다.

reducer.js
  function todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':{
        const newTodo = [...state.todos, action.todo];
        return {
          todos: newTodo,
          compledtedTodos: newTodo.filter(todo => todo.isCompleted),
        }
      }
    ...
    }
  }
// combineReducers로 합친 여러 reducer 중 하나로 가정하자. 
// 위와 같이 completedTodos 필드를 만들어서, todos에 맞춰 completedTodos를 바꿔준다. 
// 이렇게 하면 데이터의 중복이 생겨 redux가 불필요하게 커진다. 다른방법으로는,

todolist.js
const TodoList = ({ todos }) => {
  const getCompletedTodos = list => list.filter(item => item.isCompleted);
  return (
    <div>
      {
        getCompletedTodos(todos).map(todo => <li>{todo.description}</li>)
      }
    </div>
  );
}

export default connect(state => ({ todos: state.todo.todos })(TodoList);

// 데이터를 component 안에서 가공하는 방법이다. 
// 간단하지만 component가 업데이트 될 때마다 getCompleteTodos의 계산이 반복된다. 
// 이 같은 단점은 selector를 통해 처리할 수 있다.

todolist.js
const TodoList = ({ completedTodos }) => (
  <div>
    {
      completedTodos.map(todo => <li>{todo.description}</li>)
    }
  </div>
);

export default connect(state => ({
  completedTodos: state.todo.todos.filter.map(todo => todo.isCompleted),
})(TodoList);

// 가장 단순한 방법으로 selector를 적용한 방법이다. 
// redux의 state를 props로 가져올 때 계산을 해서 가져오도록 하여, 
// 불필요한 계산을 막는다. 조금 더 개선하여 재사용성을 높여보자.

reducer.js
export const getCompletedTodos = state => state.todo.todos.filter.map(todo => todo.isCompleted);
todolist.js
import { getCompletedTodo } from './reducer.js';

const TodoList = ({ completedTodos }) => (
  <div>
    {
      completedTodos.map(todo => <li>{todo.description}</li>)
    }
  </div>
);

export default connect(state => ({
  completedTodos: getCompleteTodos(state),
})(TodoList);

// reducer나 selector 파일에 selector 함수를 만들어(getCompleteTodos) export하면 어떤 컴포넌트에서도 사용할 수 있다. (왜??????)
// 또한, state.todo를 인자로 주기보단 state를 인자로 주면 state의 구조가 바뀌어도 getCompleteTodos 함수만 바꿔주면 불필요한 수고를 덜 수 있다.
// 이 정도도 좋아보이지만 문제가 있다. 
// store가 업데이트 될 때마다 getCompleteTodos는 매 번 계산을 하게된다. 
// mapStateToProps는 redux store의 업데이트를 subscribe 한다. 
// 이는, store가 업데이트 될 때마다 mapStateToProps가 호출된다는 것을 의미한다. 
// 이러한 문제를 해결할 수 있는 방법은 바로 reselect 라이브러리를 이용하는 것이다.

// Reselect
// reselect는 기본적으로 위에 만들었던 selector와 같은 역할을 한다. 하지만 추가적인 기능이 있다.
// 먼저, memoization을 이용한다. 즉, 이전에 계산된 값을 캐시에 저장하여 불필요한 계산을 없앤다. 어떻게 적용하는지 코드를 보자.

reducer.js
import { createSelector } from 'reselect';

// 이 함수도 state에서 todos를 가져오는 selector 이다.
const getTodos = state => state.todo.todos;

export const getCompletedTodos = createSelector(getTodos, todos =>
  todos.filter(todo => todo.isCompleted),
);
// createSelector가 우리가 바라는 역할을 해준다. 
// 첫 여러인자 또는 배열안에 인자는 inputSelectors 라고 할 수 있는데, 
// 이 또한 selector로서 인자로 받는 state에서 우리가 필요한 부분을 가져오는 역할을 한다. 
// 그 다음 인자인 함수에서는 inputSelectors에서 반환된 값을 인자로 받아 계산을 수행한다. 
// 여기서는 간단하게 표현하기 위해 한 reducer에서 값을 가져왔지만 보통은 여러개의 reducer에서 값을 가져와 계산하는 작업을 수행한다.

import { createSelector } from 'reselect';

const getTodos = state => state.todo.todos;
const getFilter = state => state.filter.filter;

export const getCompletedTodos = createSelector([getTodos, getFilter], (todos, filter) =>
  todos.filter(todo => todo.isCompleted === filter),
);
// 이런식으로 두 state에서 가져온 값을 적용시켜 결과를 가져올 수 있다.

// 아까 말했듯이 reselect는 memoization이 적용되는데, 
// 그 기준이 되는 값은 inputSelector의 결과값이다. 
// 이 값이 바뀌지 않고 store가 업데이트 되었을 때, 
// reselect는 저장된 cache 값을 사용하여 불필요한 재계산을 하지 않도록 해준다.

// 결론
// 개인적으로 처음 selector 패턴과 reselect를 보았을 때는 redux를 고급스럽게? 
// 조금 더 깊게 사용하기 위한 방법으로 다가왔었다. 
// 하지만, 필수적인 요소이다. reselect 또한 사용하지 않을 이유가 없다.