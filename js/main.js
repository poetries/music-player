//H5音频文件的接口 
window.AudioContext=window.AudioContext||
					window.webkitAudioContext||
					window.mozAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame ||
							   window.webkitRequestAnimationFrame || 
							   window.mozRequestAnimationFrame || 
							   window.msRequestAnimationFrame;
							   
window.onload = function(){
	var oBtnPlay = getId("play")
	,   audio = getId("audio")
	,	mark = true
	;
	
	oBtnPlay.onclick = function(){
		if(mark){
			audio.play();
		}else {
			audio.pause();
		}
		mark = !mark;
	}
	
}

function getId(idName){
	return document.getElementById(idName);
}
