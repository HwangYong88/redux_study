// 브라우저 전체를 담당하는 게 Window 객체(dom?))---------------------------------------------------------------------------------------
// 1) window.close()

// 2) window.open()
// ex) var popup = window.open('', '', 'width=200,height=200');
// popup.document.write('안녕하세요');

// 3) window.encodeURI(), window.decodeURI()
// 한글이 이상하게 표시될때 사용

// 4) window.setTimeout(함수, 밀리초), window.setInterval(함수, 밀리초)

// 5) window.getComputedStyle(태그)
// 알아두면 유용한 태그의 스타일을 찾는 메소드입니다. 현재 적용된 CSS 속성 값을 알 수 있어 유용합니다.

// 6) navigator
// 브라우저나, 운영체제(OS) 대한 정보
// navigator.language; // "ko"
// navigator.cookieEnabled; // true
// navigator.vendor; // "Google Inc"

// 7) screen
// 화면에 대한 정보
// screen.availHeight; // 1080
// screen.availWidth; // 1920
// screen.colorDepth; // 24

// 8) history
// 앞으로가기 : history.forward() ,history.go(1))
// 뒤로가기 : (history.back(), history.go(-1))
// 히스토리간에 이동 : (history.go(페이지수))
// 뒤로가기할 수 있는 페이지의 개수 : history.length
// 페이지를 이동하지않고 주소만 바꿈 : history.pushState(객체, 제목, 주소), history.replaceState(객체, 제목, 주소)

// 9) location
// 주소에 대한 정보
// protocol, host, hostname, pathname, href, port, search, hash
// 새로고침 : location.reload()
// 주소변경 : location.replace()

// 웹사이트만 담당하는게 Document 객체(bom)---------------------------------------------------------------------------------------
// document.getElementById(아이디)
// document.getElementsByClassName(클래스)
// document.querySelector(선택자)
// document.querySelectorAll(선택자)
// document.createElement(태그명)
// document.createDocumentFragment() : 가짜 document를 만듭니다.
//     왜 이게 중요하냐면 자바스크립트로 document의 태그를 조작하는 것은 매우 성능이 떨어집니다.
//     특히 여러 태그를 반복문을 통해 동시에 추가할 때는요. 이럴 때 미리 가짜 document를 만들어서 여기에 추가를 한 후,
//     한 번에 document에 추가합니다. 이러면 진짜 document는 한 번만 조작하면 돼서 성능에 부담이 덜합니다.
// document.head
// document.body
// document.title
