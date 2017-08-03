var babyObj = function (){
	this.x;
	this.y;
	this.angle;
	this.babyBody = new Image();

	this.babyTailTimer = 0; //计时器
	this.babyTailCount = 0; //进入当前图片序号的变量

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBabyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 -50;
	this.y = canHeight * 0.5 -+50;
	this.angle = 0;
	this.babyBody.src = "./src/babyFade0.png";
}
babyObj.prototype.draw = function (){
	//ctx1

	//lerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.99);
	this.y = lerpDistance(mom.y, this.y, 0.99);
	//lerp angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI~PI

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);


	//baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	//baby eye
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	//baby body
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300){
		this.babyBabyCount = this.babyBabyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBabyCount > 19){
			this.babyBabyCount = 19;
			//game over
			data.gameOver = true;		
		}
	}


	//translate()其实是原来的原点分别在x轴和y轴偏移多远的距离，然后以偏移后的位置作为坐标原点。
	//也就是说原来在（100,100）,然后translate（1，1）新的坐标原点在（101,101）而不是（1,1）
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height *0.5);
	
	var babyBabyCount = this.babyBabyCount;
	ctx1.drawImage(babyBody[babyBabyCount], -babyBody[babyBabyCount].width * 0.5, -babyBody[babyBabyCount].height *0.5);
	
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height *0.5);
	
	ctx1.restore();
}