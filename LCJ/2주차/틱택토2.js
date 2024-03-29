var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
    var 다참 = false;
        
    //가로
    if ( 칸들[몇줄][0].textContent === 턴 &&
         칸들[몇줄][1].textContent === 턴 &&
         칸들[몇줄][2].textContent === 턴 ) {
             다참 = true;
         }
    //세로
    if ( 칸들[0][몇칸].textContent === 턴 &&
         칸들[1][몇칸].textContent === 턴 &&
         칸들[2][몇칸].textContent === 턴 ) {
            다참 = true;
        }
    //대각선
        if(
            칸들[0][0].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][2].textContent === 턴 
        ) 다참 = true;

        if(
            칸들[0][2].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][0].textContent === 턴 
        )   다참 = true;

        return 다참;
}

function 초기화(무승부){
    if (무승부){
        결과.textContent = '무승부';    
    } else{
        결과.textContent = 턴 + '님이 승리!';
    }
     //초기화
    setTimeout( function() {
        결과.textContent = '' ;
        칸들.forEach(function( jool ) {
        jool.forEach(function (caan) {
            caan.textContent = '';
        }) ;
    }) ;
    턴 = 'X';
    }, 1000 );
}


var 비동기콜백 = function(이벤트) {
    if ( 턴 === 'O'){
        return ;
    }

    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);

    if( 칸들[몇줄][몇칸].textContent != '' ){
        console.log('빈 칸이 아닙니다');
    }
    else{
        console.log('빈 칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;


        var 다참 = 결과체크(몇줄, 몇칸);

        // 모든 칸이 다 찼는지 검사
        var 후보칸 =[];
        칸들.forEach( function(줄){
            줄.forEach(function (칸){
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function(칸){ return !칸.textContent});
       
       
        // 다 찼으면
        if (다참){
            초기화(false); //빈 칸으로 둬도 undefined 즉 if문에서 false이므로 괜춘
            
        }
        else if( 후보칸.length === 0){
            초기화(true);
        }
        else{
            if( 턴 === 'X')
                턴 = 'O';
/////////////////////////////////////////////////////////////
            setTimeout( function() {
                console.log('컴퓨터의 턴입니다');
               

                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length) ];
                선택칸.textContent = 턴;
                //컴퓨터가 승리했는지 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 다참 = 결과체크(몇줄, 몇칸);
                // 다 찼으면
                    if (다참){
                       초기화();
                    }


                //턴을 나에게 넘긴다
                턴 = 'X' ;
            }, 1000);
///////////////////////////////////////////////////////////////            
        }
    }
} ;

for (var i=1; i<=3; i++){
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for (var j=1; j<=3; j++){
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i - 1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}

바디.appendChild(테이블);
바디.appendChild(결과);
console.log('줄들', 줄들, '칸들', 칸들) ;



