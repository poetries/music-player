// H5音频文件的接口 
window.AudioContext=window.AudioContext||
					window.webkitAudioContext||
					window.mozAudioContext;
// 请求动画帧
window.requestAnimationFrame = window.requestAnimationFrame ||
							   window.webkitRequestAnimationFrame || 
							   window.mozRequestAnimationFrame || 
							   window.msRequestAnimationFrame;

							   
window.onload = function(){
	var oBtnPlay = getId("play")
,   prev = getId("prev")
,   next = getId("next")
,   love = getId("love")
,   download = getId("download")
,   song_title = getId("song_title")
,   song_author = getId("song_author")
,   audio = getId("audio")
,	mark = true
,   singer_pic = getId("singer_pic").getElementsByTagName("img")[0]
,   actx = new AudioContext() //创建音乐对象
,   analyser = actx.createAnalyser() //创建一个分析节点对象
,   audioSrc = actx.createMediaElementSource(audio)  //创建媒体源节点
,   canvas = getId("canvas")
,   ctx = canvas.getContext("2d")
,   canvasColor //音普的渐变颜色
,   num = 100 // 限制绘制在canvas上的音普数量
,   n = 0 // 与Data数组数据挂钩
;

	oBtnPlay.onclick = function(){
		if(mark){
			audio.play();
			singer_pic.className = "rorate";
			this.style.backgroundImage = "url(images/zanhover.png)";
		}else {
			audio.pause();
			singer_pic.className = "";
			this.style.backgroundImage = "url(images/playhover.png)";
		}
		mark = !mark;
	}
	
	function switchSong(){
		audio.src = data[n].src;
		singer_pic.src = data[n].star;
		song_title.innerHTML = data[n].name;
		song_author.innerHTML = data[n].singer;
		
		//切换的时候更改样式
		audio.play();
		oBtnPlay.style.backgroundImage = "url(images/zanhover.png)";
		love.setAttribute("class","iconfont music_func_item");
		download.setAttribute("class","iconfont music_func_item");
	}
	//上一曲
	prev.onclick = function(){
		n--;
		if (n < 0) {
			n = data.length - 1;
		}
		switchSong();
	}
	
	//下一曲
	next.onclick = function(){
		n++;
		if (n > 5) {
			n = 0;
		}
		switchSong();
	}
	
	audioSrc.connect(analyser); //媒体源节点链接到分析机制中
	analyser.connect(actx.destination); //将分析机制与目标点链接（扬声器）
	
	//创建音普的渐变颜色
	canvasColor = 	ctx.createLinearGradient(canvas.width*0.5,0,canvas.width*0.5,100); 
	canvasColor.addColorStop(0,"#00f");
	canvasColor.addColorStop(0.5,"#f00");
	canvasColor.addColorStop(1,"#0f0");
	
	//音普绘制
	function draw(){
		//创建一个与音乐频次等长的数组  音量的高低  Uint8Array转化为0-255之间的整数
		var voiceHigh = new Uint8Array(analyser.frequencyBinCount)
		,   step
		,   value
		;
		
		analyser.getByteFrequencyData(voiceHigh); // 将分析出来的音频数据添加到数组中
		//console.log(voiceHigh.length); // 1024
		step = Math.round(voiceHigh.length / num);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		for (var i = 0;i < num; i++) { // 把音量1024分为100组
			value = (voiceHigh[step*i]) / 3; //使数值高度保持在一百以内
			ctx.fillStyle = canvasColor;
			//7每根音普线条的之间的间隙  -value+1音普不播放的时候中间有一条线
			ctx.fillRect(i*10 + canvas.width / 2,90,7,-value+1); //音普中间高频部分
			ctx.fillRect(canvas.width / 2 - (i-1)*10,90,7,-value+1); 
			//ctx.fillRect(i*10 + canvas.width / 2,90,7,value+1); //反向对称绘制
		}
		//ctx.closePath();
		requestAnimationFrame(draw);
	}
	
	draw();
}

function getId(idName){
	return document.getElementById(idName);
}

