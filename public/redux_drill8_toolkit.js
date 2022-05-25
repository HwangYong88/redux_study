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