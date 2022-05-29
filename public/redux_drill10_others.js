const { useCallback } = require("react")

1. 의존성 주입 / 함수를 분리 / 재사용가능
ex) 다음을
const onclick = useCallback(()=>{
    dispatchEvent(logIn({
        id:'y',
        pw:'pw'
    }))
})
ex) 이렇게 변경, 의존하고있던것을 매개변수로하여 고차함수로 변경
const onclick = useCallback(outside(dispatch),[])

const outside = ((dispatch)=>()=>{
    dispatchEvent(logIn({
        id:'y',
        pw:'pw'
    }))
})

2. 변수는 컴포넌트 안에서 빼지말기.
leb a = 0; // 이부분은 안바뀜(스태틱 느낌)
ex) const App = () =>{
    let b = 0; // 이부분은 계속 렌더링시마다 바뀜
}

// hoc
// 상속으로 class 컴포넌트를 확장
// 상속의 문제점. 
// 부모에 구현된 항목을 한눈에 파악하기 힘들고, 원치않는 기능도 물려받음
// 이러한 상속 관계간의 종속성을 없애고 기능만을 따로 떼어 조합하는것을 데코레이터패턴이라함 이것은 하이어오더 컴포넌트로 구현함
// export degault function withHoc(wrappedComponent){
//      return function WithHoc(props){
//          return <wrappedComponent {...porps}/>;
//      }
// }
// 인자에 컴포넌트를 넣고 원하는 형태의 컴포넌트로반환(1->2), 인자는 출력함수 에서 그대로 출력.(2->3) 
// 하이오더컴포넌트 이름 규칙은 with로 시작

// 예제) 로딩중표시 기능을 하이어오더컴포넌트로 만들기
// export degault function withHoc(wrappedComponent){
//      return function WithHoc({isLoading, ...props}){

        // if(isLoading){
        //     return 'loading...'
        // }
//          return <wrappedComponent {...porps}/>;
//      }        
// }