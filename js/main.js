$(function(){
	var y = 0;
    var _h = 0;
    var _t = 0;
    var newTop = 0;
    var _height = 0;
    var  percent = 0;
    var scrollTextH = 0;
	    
	//menu show and hide
	
	$("#menu_btn").on("click",function(){
		$(".scrollCon").slideToggle(500);
	});
	$("#music_song_btn").on("click",function(){
		$(".music_song_content").toggle(1000);
		
	});
	
	//background
	$(".skin_btn,.pic_comm").on("click",function(){
		$(".skin_content").slideToggle(500);
		
	});
	$(".skin_title").find("span").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".skin_title span").on("click",function(){
		var index = $(this).index();
		$(".skin_img .pic_comm").eq(index).addClass("active").siblings().removeClass("active");
	});

	$(".pic_comm img").click(function(){
		var picUrl = $(this).attr("src");
		
		$("body").css({"background":"url("+picUrl+")"+" no-repeat"});
	});

	
    //滚动条
    $(".scrollBtn").mousedown(function (e) {

        y = e.clientY; //鼠标按下距离浏览器顶部的距离
        _h = $(".scrollBtn").offset().top; //滑块距离浏览器顶部的距离
        _t = y-_h;//鼠标按下的位置距离滑块顶端的距离
        _height =  $(".scrollBar").height()- $(".scrollBtn").height();

        $(document).mousemove(function (e) {
            newTop = e.clientY - _t - $(".scrollBar").offset().top;//鼠标按下的位置距离scrollBar顶部的距离
            if (newTop<0){
                newTop = 0;
            }else if (newTop>_height){
                newTop = _height;
            }
            $(".scrollBtn").css("top",newTop);
            //document.title = newTop;

            //计算滑块在能滑动范围内的比例
            percent = newTop/_height;
            scrollTextH = percent*($(".scrollText").height()-$(".scrollCon").height());
            $(".scrollText").css("top",-scrollTextH);
        });
        $(document).mouseup(function () {
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");

        });
        return false;//阻止浏览器默认行为
    });
	
	//love 
	$("#love").click(function(){
		$(this).toggleClass("love");
	});
	$("#play").click(function(){
		$(this).find(".play_btn").toggleClass("active");
	})
});
