var 숫자1 = Math.ceil(Math.random() * 9 );
var 숫자2 = Math.ceil(Math.random() * 9 );
var 결과 = 숫자1 * 숫자2 ;
var 바디 = document.body;
var 질문 = document.createElement('div');
질문.textContent = 숫자1 + '곱하기' + 숫자2 + '는?' ;
document.body.append(질문);
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
var 버튼 = document.createElement('button');
폼.append(버튼);
버튼.textContent = '제출';

var 결과창 = document.createElement('div');
바디.append(결과창);

폼.addEventListener('submit', function 콜백(e){
    console.log(결과);

    e.preventDefault();
    
    if( 결과 === Number(입력창.value ) ){
        결과창.textContent = '딩동댕' ;
        숫자1 = Math.ceil(Math.random() * 9 );
        숫자2 = Math.ceil(Math.random() * 9 );
        // 결과 앞에 var 쓰면 에러
        결과 = 숫자1 * 숫자2
        질문.textContent = 숫자1 + '곱하기' + 숫자2 + '는?' ;
        입력창.value = '';
        입력창.focus();
    }
    else{
        결과창.textContent = '땡' ;
        입력창.value = '';
        입력창.focus();
    }

});