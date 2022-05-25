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

