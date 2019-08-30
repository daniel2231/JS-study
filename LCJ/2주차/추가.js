//참조 아닌 복사

var obj = { a : 1, b : 2, c : 3};
var obj2 = {};

// slice() 랑 같은 기능
Object.keys(obj).forEach(function(k){
    obj2[k] = obj[k];
});

//혹은
Object.assign(obj2, obj);


obj2.a = 4;

// obj.a 해도 1. 하지만 이중 이상의 구조인 경우 참조가 되어버림

function copyObj(obj){
    var copy = {};
    if (typeof obj === 'object && obj != null'){
        for (var attr in obj){
            if (obj.hasOwnPropery(attr)) {
                copy[attr] = copyObj(obj[attr]);
            }
        }
    } else{
        copy = obj ;
    }
    return copy;
}

//하지만 불완전, 아래 꺼가 최선

obj3 = JSON.parse(JSON.stringify(obj));

// 근데 또 완전한 방법은 아니라고 하는군. 그리고 성능 최악

// 실무에서 아래처럼 쓰진 않는다 함

var 프로토타입 = {
    type: '카드',
    attack: function() {} ,
    defend: function() {} ,
};
function 카드공장(name, attr, hp){
    var 카드 = {
        name: name,
        att: attr,
        hp: hp,
    }
    카드.__proto__ = 프로토타입;
    return 카드;
};

var card = 카드공장('제로초', 50, 50);

// 참조는 쌍방이기 때문에 프로토타입 쓰면 유지보수 편함
// 근데 실무에선 __proto__ 이렇게 안 함. JS 2nd 공신력 MDN 사이트
// 표준이 아니라 함. 그냥 크롬에서 일단 쓰고있을 뿐. 아래가 표준

function 카드공장(name, attr, hp){
    var 카드 = Object.create(프로토타입);
        카드.name = name ;
        카드.att = attr ;
        카드.hp = hp ;
    
    return 카드;
};