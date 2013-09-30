/* ----------------------------------------------------*/
// logomove
/* ----------------------------------------------------*/

var selector;
var logohover;
var movecnt;

$(window).on("load",function () {

	movecnt = 0;
	logohover = true;

	//リファラ判定、ページ内からの遷移なら
//	var urlstring = document.referrer;
//	var retval = new RegExp("webnaut", "i");

	topfirstview();
	move();

});

function move(){

	selector = $("#logo h1.logoWebnaut span.logoWebnaut_default, #logo h1.logoWebnaut span.logoWebnaut_blk,#logo h1.logoWebnaut span.logoWebnaut_red, #logo h1.logoWebnaut span.logoWebnaut_blu");

	logohover = true;
	movecnt++;

	selector.animate({top:"-30px"},{duration:2000,easing:"easeInOutSine"});
	selector.animate({top:"0px"},{duration:2000,easing:"easeInOutSine",complete: move});

}

/* ----------------------------------------------------*/
// categortyanimate
/* ----------------------------------------------------*/
var caterogyTimerID;
var looplength;
var loopcnt;

var firstcattime = 2000;	//ページ表示時
var re_cattime = 4000;	//マウスアウト時
var nextloopinterval= 7000;		//次のループ開始までの間隔
var loopinterval = 300;	//カテゴリーを上下する間隔

function hoveraction(){

$("#category ul li a").hover(function(){
		if(loopcnt != 0 ){
			$("#category li a span.categoryIcon").eq(loopcnt-1).fadeTo("fast",0.0);		//残っているフェード効果を消す
		}
		clearTimeout(caterogyTimerID);
	}, function(){
		loopcnt = 0;	//カウンタ初期化
		caterogyTimerID = setTimeout("catanime()",re_cattime);
	});

}

function catanime(){

	//クラス付与・除去
	if(loopcnt < looplength){
		$("#category li a span.categoryIcon").eq(loopcnt).fadeTo("slow",1.0);
	}
	if(loopcnt > 0){
		$("#category li a span.categoryIcon").eq(loopcnt-1).fadeTo("slow",0.0);
	}

	//カウンタインクリメント
	if((loopcnt) == looplength){
		loopcnt = 0;
		caterogyTimerID = setTimeout("catanime()",nextloopinterval);
	}else{
		loopcnt++;
		caterogyTimerID = setTimeout("catanime()",loopinterval);
	}

}

$(window).on("load",function () {
	loopcnt = 0;		//カウンタ初期化

	looplength = $("#category span.categoryIcon").length;
	caterogyTimerID = setTimeout("catanime()",firstcattime);
	//オーバー状態の時は処理を止める
	hoveraction();
});
