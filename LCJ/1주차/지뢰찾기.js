var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,

}


document.querySelector('#exec').addEventListener('click', function() {
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    중단플래그 = false;
    dataset = [];
    열은칸 = 0;
    var hor = parseInt(document.querySelector('#hor').value );
    var ver = parseInt(document.querySelector('#ver').value );
    var mine = parseInt(document.querySelector('#mine').value );
    console.log(hor, ver, mine);

    //지뢰 위치 뽑기
    var 후보군 = Array(hor * ver)
        .fill()
        .map(function (요소, 인덱스) {
            return 인덱스 ;
        })
    var 셔플 = [];

    while (후보군.length > hor * ver - mine) {
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값) ;
    }

    console.log(셔플) ;

    //지뢰 테이블 만들기
    for (var i = 0; i < ver; i ++){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j=0; j < hor ; j++){
            arr.push(코드표.보통칸);  //열면 1로 바뀌도록
            var td = document.createElement('td');
        //우클릭 깃발 
            td.addEventListener('contextmenu', function(e){
                if (중단플래그){
                    return ;
                }
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget) ;
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                // console.log(부모tr, 부모tbody, e.currentTarget, 칸, 줄) ;
                // .target은 event가 발생한 대상, .currentTarget은 리스너가 달린 대상
                if( e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if ( dataset[줄][칸] === 코드표.지뢰){
                        dataset[줄][칸] = 코드표.깃발지뢰 ;
                    } else{
                        dataset[줄][칸] = 코드표.깃발;
                    }
                }  
                
                else if ( e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                
                    if ( dataset[줄][칸] === 코드표.깃발지뢰){
                        dataset[줄][칸] = 코드표.물음표지뢰 ;
                    } else{
                        dataset[줄][칸] = 코드표.물음표;
                    }               
                }
                
                else if ( e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('question');
                    if( dataset[줄][칸] === 코드표.물음표지뢰){
                        e.currentTarget.textContent = 'X' ;
                        dataset[줄][칸] = 코드표.지뢰;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });

            td.addEventListener('click', function(e){
                if (중단플래그){
                    return;
                }

                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget) ;
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
    
                if ( [코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸]) ){
                    return ;
                }
                // 클릭했을 때 주변 지뢰 개수
    
                e.currentTarget.classList.add('opened') ;   // $(this).addClass('opened') ;
                열은칸 += 1 ;

                if (dataset[줄][칸] === 코드표.지뢰){
                    e.currentTarget.textContent = '펑' ;
                    document.querySelector('#result').textContent = '실패 ㅠㅠ';
                    중단플래그 = true;
                }
                else{
                    dataset[줄][칸] = 1;

                    var 주변 = [
                        dataset[줄][칸-1], dataset[줄][칸+1],
                    ];
                    if (dataset[줄-1]){
                        주변 = 주변.concat( [dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]  ] )
                    }
                    if (dataset[줄+1]){
                        주변 = 주변.concat( [dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]  ] )
                    }

                    var 주변지뢰개수 = 주변.filter(function(v){
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
                    }).length;
                    e.currentTarget.textContent = 주변지뢰개수 || '';

                    dataset[줄][칸] = 코드표.연칸 ;

                    if(주변지뢰개수 ===0){
                        var 주변칸 = [] ;
                        if( tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1],

                            ]);
                        }
                            주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ]);

                        if(tbody.children[줄+1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1],
                            ]);
                        }

                        // null이나 undefined된 거 다 지워주기
                        주변칸.filter( function(v){
                            return !!v;
                        }).forEach( function(이웃칸){
                            var 부모tr = 이웃칸.parentNode;
                            var 부모tbody = 이웃칸.parentNode.parentNode;
                            var 이웃칸칸 = Array.prototype.indexOf.call(부모tr.children, 이웃칸) ;
                            var 이웃칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if (dataset[이웃칸줄][이웃칸칸] !== 코드표.연칸){
                              이웃칸.click();
                            }

                        });
                    }
                }

                if( 열은칸 === hor * ver - mine){
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '이겼다 ^^';
                }


            }) ;

            tr.appendChild(td);

        }   
        tbody.appendChild(tr) ;
    }  
    //지뢰 심기
    for (var k=0; k < 셔플.length ; k++){
        var 세로 = Math.floor(셔플[k] / ver);
        var 가로 = 셔플[k] % ver ;
        
        
        console.log(세로, 가로) ;
        tbody.children[세로].children[가로].textContent = 'X' ;
        dataset[세로][가로] = 코드표.지뢰 ;

    }

    console.log(dataset) ;

});




/* 클로저

for (var i=0; i<100 ; i++){
    function 클로저(j){
        setTimeout( function() {
            console.log(j);
        }, j * 1000) ;
    }
    클로저(i);
    // 아니면 function을 ()로 감싼 다음 (i); 붙여서 즉시실행
}


*/

