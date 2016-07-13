var classN="sd2_"; 
var selItem=function(){
	var list=null; 
	var item=null; 
	var seleted=null; 
	var itemW=0; 
	var speed=250; 
	var mePosx=0
	var speed=250;
	var easing="easeOutCubic"; 
	var onPosXarr=[];
	

	var init=function(){
		list=$("#device_list");
		item=list.children("li");
		itemW=item.width(); 
		onPosXarr=[111, 50, 100, 95, 92];
		eventDefine();
	}
		
	var eventDefine=function(){
		item.on("mouseenter", openItem);
		item.on("mouseleave", closeItem);
	}

	var openItem=function(e){
		var me=this; 
		var widthInfo={seleted : 300, none : 170};
		var imgWrap=$(me).find("."+classN+"img_wrap");
		mePosX=Number(imgWrap.css("right").replace("px", ""));
		
		item.each(function(){
			if(this != me){
				$(this).stop().animate({"width": widthInfo.none+"px"}, speed, easing);
			}else{
				$(me).stop(true).animate({"width": widthInfo.seleted+"px"}, speed, easing).addClass(classN+"active"); 
				imgWrap.stop(true).delay(250).animate({"right":onPosXarr[$(me).index()]+"px"}, 450, "easeInOutQuint"); 
				imgWrap.children("."+classN+"device_off").css("display","none");
				imgWrap.children("."+classN+"device_on").css("display","block");
			}
		})
		seleted=$(me);
	}

	var closeItem=function(e){
		var imgWrap=seleted.find("."+classN+"img_wrap");
		imgWrap.stop(true).animate({"right": mePosX+"px"}, 250, easing); 
		imgWrap.children("."+classN+"device_on").css("display","none");
		imgWrap.children("."+classN+"device_off").css("display","block");

		seleted.removeClass("active"); 
		item.each(function(){
			$(this).stop(true).animate({"width": itemW+"px"}, speed, easing ).removeClass(classN+"active"); 
		})
	}
	
	init(); 
}//selItem

var slide=function(){
	var slide=null;
	var slideItem=null; 
	var cirNav=null; 
	var slideTimer=null; 
	var prev=null;
	var next=null; 
	var total=0; 
	var count=0;
	var speed=450;
	var prevCount=0; 
	var duration=6000;


	var init=function(){
		slide=$("#slide"); 
		cirNav=$("#cirNav"); 
		prev=$("."+classN+"arr_nav").find("."+classN+"prev");
		next=$("."+classN+"arr_nav").find("."+classN+"next");
		slideItem=slide.children("li");
		total=slide.children("li").length;
		slideTimer=setInterval(function(){
			next.trigger("click"); 
		}, duration); 
		
		cirMake(); 
	}

	var cirMake=function(){
		var ele=[]
		for(var i=0; i<total; i++){
			var cirHtml="<li><a href='#'>"+(i+1)+"</a></li>";
			ele.push(cirHtml); 
		}
		cirNav.append(ele); 
		cirNav.children("li").eq(0).addClass(classN+"active");

		eventDefine(); 
	}

	var eventDefine=function(){
		$("."+classN+"main_visual_wrap").on("mouseenter mouseleave", arrFn);
		prev.on("click", prevClick);
		next.on("click", nextClick); 

		cirNav.find("a").on("click", function(){
			count=$(this).parent().index(); 
			posDefine(); 
			return false;  
		})
	}
	
	var arrFn=function(e){
		var etype=e.type;
		var speed=100;
		switch(etype){
			case "mouseenter" :
				prev.fadeIn(speed);
				next.fadeIn(speed);
				break;
			case "mouseleave":
				prev.fadeOut(speed);
				next.fadeOut(speed);
				break;
		}
	}

	var prevClick=function(){
		count--;
		if(count<0){
			count=total-1; 
		}
		countP="-100%"; 
		prevCountP="100%"; 
		cirCheck();
		slideMove(countP, prevCountP); 
		return false; 
	}

	var nextClick=function(){
		count++; 
		if(count>total-1){
			count=0; 
		}
		countP="100%"; 
		prevCountP="-100%"; 
		cirCheck();
		slideMove(countP, prevCountP); 
		return false; 
	}

	var posDefine=function(){
		var countP=0; 
		var prevCountP=0;

		if(count>prevCount){
			countP="100%";
			prevCountP="-100%"; 
		}else if(count<prevCount){
			countP="-100%";
			prevCountP="100%"; 
		}

		slideMove(countP, prevCountP); 
	}

	var slideMove=function(countP, prevCountP){
		if(slideTimer){
			clearInterval(slideTimer)
		}

		cirCheck();
		slideItem.eq(count).css({"left" : countP}); 
		slideItem.eq(count).stop().animate({"left" : 0}, speed, 'easeOutCubic'); 
		slideItem.eq(prevCount).stop().animate({"left" : prevCountP}, speed, 'easeOutCubic'); 
		prevCount=count;

		slideTimer=setInterval(function(){
			next.trigger("click"); 
		}, duration); 
	}

	var cirCheck=function(){
		cirNav.children("li").eq(prevCount).removeClass(classN+"active")
		cirNav.children("li").eq(count).addClass(classN+"active"); 
	}

	init(); 

}//slide

$(document).ready(function(){
	var deviceOpen=new selItem(); 
	var smSlide=new slide();
})