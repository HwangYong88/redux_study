// 벨로퍼트와 함께하는 모던 리액트 다시 한번 정리

// useRef : 특정 dom을 선택할때 씀 ---------------------------------------------------------------------------------
// useRef Hook 은 DOM 을 선택하는 용도 외에도, 다른 용도가 한가지 더 있는데요,
// 바로 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 것 입니다.
// ★useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않습니다.★
// 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서
// 그 다음 렌더링 이후로 업데이트 된 상태를 조회 할 수 있는 반면,
// useRef 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있습니다.

// 이 변수를 사용하여 다음과 같은 값을 관리 할 수 있습니다.
// 1)setTimeout, setInterval 을 통해서 만들어진 id
// 2)외부 라이브러리를 사용하여 생성된 인스턴스
// 3)scroll 위치

// ex)  const nextId = useRef(4);
// const onCreate = () => {
//   // 나중에 구현 할 배열에 항목 추가하는 로직
//   // ...

//   nextId.current += 1;
// };

// useEffect : deps값이 바뀔때 어떤 처리를 하고 싶을때 ---------------------------------------------------------------------------------
// deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고,
// 지정한 값이 바뀔 때에도 호출이 됩니다.
// deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 됩니다.

// React.memo ---------------------------------------------------------------------------------
// React.memo(이하 공홈의 설명)
// const MyComponent = React.memo(function MyComponent(props) {
//   /* props를 사용하여 렌더링 */
// });
// React.memo는 고차 컴포넌트(Higher Order Component)입니다.
// 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록
// 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.
// React.memo는 props 변화에만 영향을 줍니다. React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer
// 또는 useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.
// props가 갖는 복잡한 객체에 대하여 얕은 비교만을 수행하는 것이 기본 동작입니다.
// 다른 비교 동작을 원한다면, 두 번째 인자로 별도의 비교 함수를 제공하면 됩니다.

// function MyComponent(props) {
//   /* props를 사용하여 렌더링 */
// }
// function areEqual(prevProps, nextProps) {
//   /*
//   nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
//   */
// }
// export default React.memo(MyComponent, areEqual);

// React Component(컴포넌트)의 생명 주기 요약 ---------------------------------------------------------------------------------
// 1)컴포넌트가 생성될 때
//     Mount(마운트)
//   -  DOM 객체를 생성하고, 이를 웹 브라우저에 출력하는 것.
//   -  즉, 기본 DOM에 컴포넌트(새롭게 추가한 코드 또는 수정한 코드) 를 렌더링해 새로운 DOM 객체를 만들고, 이를 웹 브라우저에 출력합니다.

//  *** 컴포넌트가 생성되서 마운트를 위한 함수 componentDidMount() 가 호출되기까지의 과정
//     1)  constructor
//         -  컴포넌트 클래스의 생성자. 컴포넌트가 만들어질 때 마다 호출됩니다.
//         -  주로 this.state의 초기값 설정(setState는 사용 불가능합니다. 그냥 초기화입니다.), 이벤트 처리 함수 바인딩 시 사용됩니다.

//     2)  getDerivedStateFromProps
//         -  rops 로 받아온 것을 state 에 넣어주고 싶을 때 사용합니다. 그리고 static이 필요합니다.
//         -  props와 state의 동기화(값 설정) 를 위하여 호출합니다. v16.3 이후 만들어졌습니다.
//         -  Component의 Instance에 접근할 수 없습니다.
//         -  부모 컴포넌트가 다시 렌더링할 때 호출됩니다.

//     3)  render
//         -  해당 함수 내 리턴 코드를 통해 DOM의 기능과 모양 정보가 담긴 React 요소를 리턴합니다.
//         -  컴포넌트의 state를 변경하면 안됩니다.

//     4)  componentDidMount
//         -  컴포넌트 생성 ~ 렌더링(render 종료) 까지 진행된 후 호출되는 함수입니다.
//         -  ★여기선 주로 D3, masonry 처럼 DOM 을 사용해야하는 외부 라이브러리 연동을 하거나,
//              해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나,
//              DOM 의 속성을 읽거나 직접 변경하는 작업을 진행합니다.★

// 테스트 코드
// constructor(props) {
//   super(props);
//   console.log("Constructor 호출!");
// }

// static getDerivedStateFromProps(nexProps, prevState) {
//   console.log("getDerivedStateFromProps 호출!");
//   return null;
// }

// componentDidMount() {
// 	console.log("componentDidMount 호출!");
// }

// render() {
//   console.log("render 호출!")
//   return (
//   	<div>안녕하십니까. Render 호출입니다!</div>
//   )
// }
// 출력 결과 : "Constructor 호출!" ➡ "getDerivedStateFromProps 호출!" ➡ "render 호출!" ➡ "componentDidMount 호출!"

// 2) 컴포넌트가 업데이트 될 때
//   -  props 및 state 값 변경, 부모 컴포넌트가 리렌더링 될 때, this.forceUpdate 실행을 통해 강제로 리렌더링하는 경우 업데이트됩니다.

// *** 업데이트 시 함수 호출 과정
//   1)  getDerivedStateFromProps
//         -  마운트(Mount) 과정에서도 호출된 함수입니다.(props와 state의 동기화(값 설정) 를 위하여 호출)

//   2)  shouldComponentUpdate
//         -  컴포넌트의 리렌더링 여부를 결정하는 함수입니다.
//         -  true : 다음 단계의 함수들을 호출하여 업데이트에 따른 리렌더링을 진행합니다.
//         -  false : 리렌더링을 하지 않게 되며, 다음 단계의 함수들을 실행하지 않고 끝냅니다.
//         -  forceUpdate 함수 호출 시 실행되지 않습니다.
//         -  주로 최적화 할 때 사용하는 메서드입니다. 우리가 이전에 React.memo 를 배웠었지요? 그 역할과 비슷하다고 이해하시면 됩니다.

//   3)  render
//         -  Mount와 비슷하게, View(웹 브라우저 화면) 의 리렌더링(수정)을 위해 호출됩니다.

//   4)  getSnapshotBeforeUpdate
//         -  변경된 요소에 대하여 DOM 객체에 반영하기 전에 호출되는 함수입니다.
//         -  v16 이후 만들어졌습니다.
//         -  이 함수에서 리턴하는 값을 ★ComponentDidUpdate★의 3번 째 인자로 사용할 수 있습니다.

//   5)  ComponentDidUpdate
//         -  컴포넌트 업데이트 작업(리렌더링) 이후에 호출되는 함수입니다.
//         -  ★3번째 파라미터로 getSnapshotBeforeUpdate 에서 반환한 값을 조회 할 수 있습니다.★

// 3) 컴포넌트가 제거될 때
//   -  컴포넌트가 DOM에서 제거될 때(Unmount - 언마운트) 진행합니다.
//   -  ComponentWillUnmount() 함수 하나만 호출되며, 이 함수는 컴포넌트가 DOM에서 제거되기 직전에 호출됩니다.
//   -  타이머 제거 등 을 위해 사용됩니다.

// 4) 정리
// 생성될때 : constructor ➡ getDerivedStateFormPorps ➡                         render ➡                            React Dom 및 refs 업데이트 ➡ componentDidMount
// 업데이트 :             ➡ getDerivedStateFormPorps ➡ shouldCompnentUpdate ➡ render ➡ getSnapshotBeforeUpdate ➡ React Dom 및 refs 업데이트 ➡ componentDidUpdate
// 제거될때 : componentWillUnmount
