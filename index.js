	// 点击开始游戏
	var content = document.getElementById('content');
	var snakeMove;
	var fenshu = document.getElementById('fenshu');
	var speed = 200;
	var btn = document.getElementsByClassName('startBtn')[0];
	btn.onclick = function(){
		this.style.display = 'none';
		init();
	}
	function init(){
		this.snakeW = 20;
		this.snakeH = 20;
		this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
		start();
		this.anjian = 'right';
		this.left = false;
		this.right = false;
		this.bottom = true;
		this.shang = true;
	}
	function start(){
		food();
		snake();
		bindEvent();
		snakeMove = setInterval(function(){
			move();
		},speed);
		
	}
	function food(){
		var food = document.createElement('div');
		food.style.position = 'absolute';
		this.foodX = Math.floor(Math.random() * (540/20));
		food.style.left = this.foodX * 20 + 'px';
		this.foodY = Math.floor(Math.random() * (400/20));
		food.style.top = this.foodY * 20 + 'px';
		content.appendChild(food).setAttribute('class','food');
	}
	function snake(){
		for(var i = 0;i < this.snakeBody.length;i ++){
			var snake = document.createElement('div');
			snake.style.width = this.snakeW + 'px'
			snake.style.height = this.snakeH + 'px';
			snake.style.position = 'absolute';
			snake.style.left = this.snakeBody[i][0] * 20 + 'px';
			snake.style.top = this.snakeBody[i][1] * 20 + 'px';
			snake.classList.add(this.snakeBody[i][2]);
			content.appendChild(snake).classList.add('snake');
		}

	}
// 开始运动
function move(){
	// 判断是否撞击了自己
	var result = snakeBody.filter(function(item){
		return item[0] == snakeBody[0][0] && item[1] == snakeBody[0][1];
	});
	if (result.length == 2){
		alert('挑战失败！分数为：' + fenshu.innerHTML);
		reload();
	}



	for(var i = this.snakeBody.length - 1;i > 0;i --){
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch(this.anjian){
		case 'right':
		this.snakeBody[0][0] ++;
		break;
		case 'left':
		this.snakeBody[0][0] --;
		break;
		case 'shang':
		this.snakeBody[0][1] --;
		break;
		case 'bottom':
		this.snakeBody[0][1] ++;
		break;
		default:
		break;
	}
	removeClass('snake');
	snake();
	// 吃到果实
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		snakeBody.push([snakeEndX,snakeEndY,'body']);
		fenshu.innerHTML ++;
		removeClass('food');
		food();
	}

	// 碰到左右边界
	if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > 26){
		alert('挑战失败！分数为：' + fenshu.innerHTML);
		reload();
	}
	// 碰到上下边界
	if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > 26){
		alert('挑战失败！分数为：' + fenshu.innerHTML);
		reload();
	}
}
function removeClass(classname){
	var e = document.getElementsByClassName(classname);
	while(e.length){
		e[0].remove();
	}
}
// 初始化游戏
function reload(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	fenshu.innerHTML = 0;
	btn.style.display = 'block';
}



// 根据获取的值进行操作
function setDerict(code){
	switch(code){
		case 37:
		if(this.left){
			this.anjian = 'left';
			this.left = false;
			this.right = false;
			this.shang = true;
			this.bottom = true;
		}
		break;
		case 39:
		if(this.right){
			this.anjian = 'right';
			this.left = false;
			this.right = false;
			this.shang = true;
			this.bottom = true;
		}
		break;
		case 40:
		if(this.bottom){
			this.anjian = 'bottom';
			this.left = true;
			this.right = true;
			this.shang = false;
			this.bottom = false;
		}
		break;
		case 38:
		if(this.shang){
			this.anjian = 'shang';
			this.left = true;
			this.right = true;
			this.shang = false;
			this.bottom = false;
		}
		break;
	}
}


// 切换开始和暂停
var ting = false;
function gengti(){
	ting = !ting;
	if(ting){
		clearInterval(snakeMove);
	}else{
		snakeMove = setInterval(function(){
			move();
		},speed);
	}
}

// 获取按键的值
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		if(code == 32){
			gengti();
		}else{
			setDerict(code);
		}
	}
}