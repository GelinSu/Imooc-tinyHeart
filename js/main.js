// JavaScript Document
var can1;	
var can2;

var ctx1;	//画笔
var ctx2;

var canWidth;
var canHeight;

//（解决帧与帧之间（动态）的时间间隔不一致）
//当前帧执行在两帧之间的时间
var lastTime;	//上一帧执行的时间
var deltaTime;	//两帧间隔的时间差

var bgPic=new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];

var data;

var wave;
var halo;

var dust;
var dustPic=[];

document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

//初始化
function init(){
	can1=document.getElementById("canvas1");//finshes,dust,UI,特效circle
	ctx1=can1.getContext("2d");
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext("2d");	
	
	can1.addEventListener('mousemove',onMouseMove, false);
	
	bgPic.src="./src/background.jpg";
	
	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	baby=new babyObj();
	baby.init();
	
	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0; i<8; i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}

	for(var i=0; i<2; i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}

	for(var i=0; i<20; i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	for(var i=0; i<8; i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0; i<2; i++){
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}
	data=new dataObj();
	for(var i=0; i<8; i++){
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0; i<7; i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}

	dust=new dustObj();
	dust.init();

}
//刷新->动起来，游戏循环：小鱼走动（每一帧的位移的效果相加）
function gameloop(){
	//原理：当前绘制完成之后，去根据机器的性能来确定间隔多长时间来绘制下一帧（只能），小问题：fps(frame per second)每秒多少帧，导致帧与帧的时间间隔是不固定的（动态的时间间隔），不同的浏览器需要补同的配置
	//科学的API，相对于setInterval、setTimeout来说，因绘制的东西非常大,60ms内不能完成
	window.requestAnimFrame(gameloop);

	var now = Date.now();//当前时间；
	deltaTime = now-lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
	
}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX||e.layerX){
			mx=e.offSetX==undefined?e.layerX:e.offSetX;
			my=e.offSetY==undefined?e.layerY:e.offSetY;
		}
	}
	
}