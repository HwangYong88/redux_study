// router 의 기본----------------------------------------------------------------------------------------------------------------
// <Route path="/about" component={About} />
// <Route path="/" exact={true} component={Home} />
// ➡　path= url , component =보여줄 컴포넌트
// ➡　하지만 실제호 /about 으로 접속하면 홈과 어바웃이 둘다보임. 그건 중복때문이라서  exact={true} 를 추가해줘야함

// 링크만들기----------------------------------------------------------------------------------------------------------------
// href는 사용하면 안되고 Link라는 컴포넌트를 이용해야 한다.
// <Link to="/">홈</Link>
// <Link to="/about">소개</Link>

// 파라미터와 쿼리----------------------------------------------------------------------------------------------------------------
// 페이지 주소를 정의 할 때, 우리는 유동적인 값을 전달해야 할 때도 있습니다. 이는 파라미터와 쿼리로 나뉘어질 수 있는데요:
// 파라미터: /profiles/velopert
// 쿼리: /about?details=true
// 이것을 사용하는것에 대하여 무조건 따라야 하는 규칙은 없지만,
// 일반적으로는 파라미터는 특정 id 나 이름을 가지고 조회를 할 때 사용하고, ★match.params★
// 쿼리의 경우엔 어떤 키워드를 검색하거나, 요청을 할 때 필요한 옵션을 전달 할 때 사용됩니다. ★location.search★

// 파라미터 받기----------------------------------------------------------------------------------------------------------------
// match객체안의 params값을 참조
// const Profile = ({ match }) => {
//   const { username } = match.params;
// };
// 전달해주기
// <Route path="/profiles/:username" component={Profile} />
// ex) /profiles/yong 이라고하면 yong값을 받는다

// Query받기----------------------------------------------------------------------------------------------------------------
// location.search값을 받아오는데 문자열 형태이다. 이것을 객체형태로 변환하는것은 qs라이브러리 이용.
// const About = ({ location }) => {
//     const query = qs.parse(location.search, {
//       ignoreQueryPrefix: true
//     });
//     const detail = query.detail === 'true'; (쿼리의 파싱결과값은 문자열)
// }

// *Router의 props----------------------------------------------------------------------------------------------------------------
// 브라우저와 리액트 앱의 Router르 연결하면 Router가 history api에 접근할 수 있게 되고
// 각 Route와 연결된 컴포넌트의 props로 match, location, history 객체를 기본적으로 전달하게 된다.
// 이 3가지 객체의 속성에 대해서 정리해보고자 한다.

// 1) match객체
// match 객체에는 Route path와 URL의 매칭에 대한 정보를 가지고 있다.
// - isExact: true이면 경로가 완전히 정확할 경우에만 수행한다.
// - params: 경로에 전달된 파라미터 값을 가진 객체
// - path: Route에 정의된 경로
// - url: 클라이언트로부터 실제 요청 받은 경로

// 2) location객체
// location 객체는 현재 페이지에 대한 정보를 가지고 있다.
// hash: 현재 페이지의 hash 값
// pathname: 현재 페이지의 경로
// search: 현재 페이지의 hash 값 ( 이를 사용해서 url의 query string을 가져올 수 있다.)

// 3) history객체
// history 객체는 브라우저의 history api에 접근한다.
// action: 최근에 수행된 action(push, pop, replace)
// block(propt): history 스택의 push와 pop 동작을 제어 / 정말 나가시겠습니까?
// go(n): history 스택의 포인터를 n으로 이동
// goBack(): 이전 페이지로 이동
// goForward(): 앞 페이지로 이동
// length: 전체 history 스택의 길이
// location: 현재 페이지의 정보
// push(path, state): 새 경로를 history 스택에 push해서 페이지 이동
// replace(path, state): 최근 경로를 histroy 스택에서 replace해서 페이지 이동

// 서브 라우팅----------------------------------------------------------------------------------------------------------------
// 라우팅 안의 라우팅
// profiles 에서는 고객리스트를 profiles/:usename 에서는 고객 상세 페이지를 보여준다.
// <Route path="/profiles/:username" component={Profile} />
// match.params를 통해 경로에 포함되어 있는 URL 파라미터를 읽어 오기

// Switch----------------------------------------------------------------------------------------------------------------
// Switch 는 여러 Route 들을 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링시켜줍니다.
// Switch 를 사용하면, 아무것도 일치하지 않았을때 보여줄 Not Found 페이지를 구현 할 수도 있습니다.
// <Switch>
// <Route path="/" exact={true} component={Home} />
// <Route path="/about" component={About} />
// <Route path="/profiles" component={Profiles} />
// <Route path="/history" component={HistorySample} />
// <Route
//     // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
//     render={({ location }) => (
//     <div>
//         <h2>이 페이지는 존재하지 않습니다:</h2>
//         <p>{location.pathname}</p>
//     </div>
//     )}
// />
// </Switch>

// NavLink----------------------------------------------------------------------------------------------------------------
// NavLink 는 Link 랑 비슷한데, 만약 현재 경로와 Link 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용 할 수 있는 컴포넌트입니다.
// 한번 Profiles 애서 사용하는 컴포넌트에서 Link 대신 NavLink 를 사용해보겠습니다.
// <li>
// <NavLink
//   to="/profiles/velopert"
//   activeStyle={{ background: 'black', color: 'white' }}
// >
//   velopert
// </NavLink>
// </li>
// 만약에 스타일이 아니라 CSS 클래스를 적용하시고 싶으면 activeStyle 대신 activeClassName 을 사용하시면 됩니다.

// connect 함수----------------------------------------------------------------------------------------------------------------
// connect 함수는 컨테이너 컴포넌트를 만드는 또 다른 방법입니다. 이 함수는 사실 앞으로 사용 할 일이 별로 없습니다.
// useSelector, useDispatch가 워낙 편하기 때문이죠. 때문에 이 내용은 이렇게 리덕스 튜토리얼의 후반부에서 다루게 되었습니다.
// 솔직히 말씀드리자면 앞으로 여러분이 리덕스를 사용하게 될 때에는 connect 함수를 더 이상 사용하게 될 일이 그렇게 많지 않을 것입니다.
// 우리가 리액트 컴포넌트를 만들 때에는 함수형 컴포넌트로 만드는 것을 우선시해야 하고, 꼭 필요할 때에만 클래스형 컴포넌트로 작성을 해야 합니다.
// 만약 클래스형 컴포넌트로 작성을 하게 되는 경우에는 Hooks 를 사용하지 못하기 때문에 connect 함수를 사용하셔야 됩니다.
// 예제)
// // mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// // 현재 리덕스 상태를 파라미터로 받아옵니다.
// const mapStateToProps = state => ({
//     number: state.counter.number,
//     diff: state.counter.diff
//   });

//   // mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
//   // dispatch 를 파라미터로 받아옵니다.
//   const mapDispatchToProps = dispatch => ({
//     onIncrease: () => dispatch(increase()),
//     onDecrease: () => dispatch(decrease()),
//     onSetDiff: diff => dispatch(setDiff(diff))
//   });

//   // connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어주세요.
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CounterContainer);

//   /* 위 코드는 다음과 동일합니다.
//     const enhance = connect(mapStateToProps, mapDispatchToProps);
//     export defualt enhance(CounterContainer);
//   */

// 기타 : mapStateToProps 와 mapDispatchToProps 의 호출 시점-----------------------------------------------------------------------------
// mapStateToProps : 스토어 상태가 변할 때마다 호출
// mapDispatchToProps : bind된 개별 액션들을 dispatch할 때마다 호출
