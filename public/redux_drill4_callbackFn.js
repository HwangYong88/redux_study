// callback 함수
// 1. ----------------------------------------------------------------------
// 정의 : 함수에 파라미터로 들어가는 함수
// (비동기 그런거와는 상관없다, 다만 비동기처리를 하는 함수들이 콜백을 사용할 뿐이므로 주의)
// 용도 : 순차적으로 실행하고 싶을 때 쓴다
// 이벤트리스너(addEventListener)도 콜백함수다
// document.querySelector('.button').addEventListener('click', function(){
//     console.log('callback'); // 버튼 클릭시 이거 실행되므로 콜백함수다
//     }
// }
// ↓　변형 : 함수명을 붙일 수 있다.
// document.querySelector('.button').addEventListener('click', 함수명 }
// setTimeout(function 함수명(){ },1000)

const { useCallback } = require("react");

// 2. ----------------------------------------------------------------------
// setTimeout() -> 몇초후에 이거 실행하세요 라는 함수
// setTimeout(function(){ },1000) 도 함수에 파라미터로 함수가 들어가기 때문에 콜백함수다

// 3. ----------------------------------------------------------------------
// 콜백함수 만드는 법
// function first(파라미터()){
//     파라미터()
// }
// function second(){

// }
// first(second)
// 해석 → first함수를 실행하면 second를 파라미터로 하는 함수가 실행된다

// 4. ----------------------------------------------------------------------
// first() 실행후 second() 실행하고싶을때
// function first(파라미터){
//     console.log(1);
//     파라미터()※←second가 실행된다
// }
// function second(){
//     console.log(2);
// }
// first(second)

// 5. ----------------------------------------------------------------------
// Q. 이거 쓰면 비동기처리가 되는건가요?
// - 비동기랑 그딴거랑 관계없습니다 비동기처리지원하는 함수들이 콜백함수 가끔 요구할 뿐임

// 6. ----------------------------------------------------------------------
// promise를 사용하기 혹은 async await
// promise란 : 비동기를 간단히 사용할 수 있게 해줌

// 사용법 // resolve:성공시 , reject:실패시
// const pr = new Promise((resolve, reject)=>{

// });

// 3가지 상태
// 1) new Promise : state:pending(대기), result:unddefined
// 2) resolve(value) : state:fulfilled(이행됨), result:value
// 3) reject(error) : state:rejected(거부됨), result:error

// ※ 선언 예시
// const pr = new Promise((resolve, reject)=>{ //프로미스도 콜백함수 이다.성공했을때 resolve를 실행하고 실패했을때 reject를 사용한다.
//     setTimeout(()=>{
//         resolve('ok')
//         // 실패시의 코드 : reject(new Error('error..'))
//     },3000)
// })
// 1) 초기상태 : state:pending, result:unddefined
// 2) 3초뒤상태 : state:fulfilled, result:'ok'
// 3) (3초실패시) : state:rejected(거부됨), result:error

// ※ 이용 예시
// pr.then(
//     function(result){},
//     // 첫번째 인수 : 이행 되었을때 실행하는 함수
//     function(err){}
//     // 두번째 인수 : 거부 되었을때 실행하는 함수
// )

// then이외에 쓸수있는것은 catch와 finally 이다
// catach와 에러시에만 쓸수있다
// ※ 이용 예시
// pr.then(
//     function(result){}
// ).catch(
//     function(err){}
// )
// 는 아래와 동일 작동 하지만 , catch문을 사용하면 가독성이 더욱 좋고 첫번째 에서 나는 에러도 잡아서 쓰는것이 좋다.
// pr.then(
//     function(result){},
//     function(err){}
// )

// ※ finally까지 포함한 예제1
const pr = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("resolve");
  //   }, 1000);
  setTimeout(() => {
    reject(new Error("err...:예제1"));
  }, 1000);
});

console.log("START:예제1");
pr.then((result) => {
  console.log(result);
})
  .catch((err) => {
    console.log(err, ":예제1");
  })
  .finally(() => {
    console.log("END:예제1");
  });

// ※ 콜백함수를 사용하는 예제2
const f1 = (callback) => {
  setTimeout(function () {
    console.log("1번 주문 완료:예제2");
    callback();
  }, 1000);
};

const f2 = (callback) => {
  setTimeout(function () {
    console.log("2번 주문 완료:예제2");
    callback();
  }, 1000);
};

const f3 = (callback) => {
  setTimeout(function () {
    console.log("3번 주문 완료:예제2");
    callback();
  }, 1000);
};

console.log("Start:예제2");
f1(function () {
  f2(function () {
    f3(function () {
      console.log("End:예제2");
    });
  });
});

// 위의 예제를 프로미스로 구현하기:예제3

const f1_1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 주문 완료:예제3");
    }, 3000);
  });
};

const f2_1 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej("2번 주문 실패:예제3");
    }, 3000);
  });
};

const f3_1 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 주문 완료:예제3");
    }, 3000);
  });
};

// 아래처럼 프로미스가 연결~연결~연결 되는것을 프로미스 체이닝(Promises Chaining)이라고 한다
console.log("promise test 실행 : 예제3");
f1_1()
  .then((res) => f2_1(res))
  .then((res) => f3_1(res))
  //.then((res) => console.log(res))
  .catch(
    setTimeout(() => {
      console.log("promise test 에러 : 예제3");
    }, 3000)
  )
  .finally(() => {
    setTimeout(() => {
      console.log("promise test 끝 : 예제3");
    }, 3000);
  });

// 결과 :
// promise test 실행:예제3
// ➡1번 주문 완료:예제3
// ➡promise test 에러 : 예제3 <<<<<캐치부분
// ➡(node:10768) UnhandledPromiseRejectionWarning: 2번 주문 실패:예제3 <<<<<<<콘솔로그
// ➡promise test 끝 : 예제3 <<<<<<파이널리
// 처음에는 결과순서가 이상해서 보았더니 catch와 finally부분에 setTimeout이 없어서 순서가 바뀌었던것

// Promise.all> 배열로받음 > 그다음 덴 실행
// 프로미스 올의 주의점 : 하나라도 에러 터지면 3개의 함수 전부가 사용불능이된다
// Promise.all([f1_1(), f2_1(), f3_1()]).then((res) => {
//   console.log(res);
//   console.log("this");
// });
// 결과값 : [ '1번 주문 완료:예제3', '2번 주문 실패:예제3', '3번 주문 완료:예제3' ]

// Promise.race > 배열로받음
// 하나라도 완성되면 처리를 완료시키고 다른것은 무시 . 용량이 큰 이미지를 보여줄때 그것만 보며주는 등의 기능에 사용된다

// async, await 공부하기 : https://www.youtube.com/watch?v=Uh8u20MD978
