var gnb=function(){
	var gnb=null; 
	var gnb_item=null;
	var bg=null; 
	var sub=null; 
	var now_menu=null; 
	var activeInfo={}; 
	var gnbTimer=null; 
	var preSub=null; 
	var preMain=null; 
	var gnb_wrap=null;
	var search=null; 
	var top_header=null; 
	var sub_item=null; 
	var bg_speed=300;
	var nowPage=0;
	var nowSub=0;
	var time=500;
	var topMargin=36;
	var gnb_margin=0;
	var classN="sd2_"; 
	var fixClass=classN+"fixed";
	var active=classN+"active";
	
	
	var init=function(){
		gnb=$("."+classN+"nav "+"."+classN+"depth_1");
		gnb_item=gnb.children("li"); 
		bg=gnb.next("span");
		gnb_wrap=$("."+classN+"header_2_wrap"); 
		top_header=$("."+classN+"header_1_wrap");
		search=top_header.find("form"); 

		nowPage=gnb_item.filter("."+active).index();
		gnb_margin=gnb_wrap.height();
		
		if(nowPage>=0){
			now_menu=gnb_item.eq(nowPage);
			if(now_menu.find("ul") !=0 ){
				sub_item=now_menu.find("ul").children("li");
				nowSub=sub_item.filter("."+active).index();
			}
		};
		eventDefine(); 
	}

	var eventDefine=function(){
		gnb_item.on("mouseenter", enterMove);
		gnb_item.on("mouseleave", function(){
			var target=$(this);
			gnbTimer=setTimeout(function(){
				leaveMove(target);
			}, time)
		});
		$(window).scroll(scrollFn);
		$(window).load(function(){
			if(nowPage>=0){
				activeShow();
			}	
		});
		if(sub_item != null && nowSub >= 0){
			sub_item.on("mouseenter mouseleave", subEvent);
		}
	}

	var subEvent=function(e){
		var etype=e.type;
		switch(etype){
			case "mouseenter":
				sub_item.eq(nowSub).removeClass(active); 
				break;
			case "mouseleave":
				sub_item.eq(nowSub).addClass(active); 
				break; 
		}
	}

	var activeShow=function(){
		activeInfo.width=now_menu.width();
		activeInfo.x=now_menu.position().left;
		bg.css({"width" : activeInfo.width+"px", "left" : activeInfo.x+"px"}); 
	}

	var scrollFn=function(){
		
		if( $(window).scrollTop() >= topMargin){
			gnb_wrap.addClass(fixClass);
			gnb_wrap.find("."+classN+"gnb_wrap").css("box-shadow", "none"); 
			search.addClass(classN+"fixed"); 
			top_header.css("margin-bottom", gnb_margin+"px");
		}else{
			gnb_wrap.removeClass(fixClass); 
			search.removeClass(fixClass); 
			gnb_wrap.find("."+classN+"gnb_wrap").css("box-shadow", "0 3px 10px rgba(00,00,00,0.3)"); 
			top_header.css("margin-bottom", 0);
		}
	}

	var enterMove=function(e){
		clearTimeout(gnbTimer);
		if(preSub){
			sub.stop().slideUp("fast");
		}
		if(preMain){
			preMain.stop().animate({"opacity":0.6}, "fast" );
		}
		var $this=$(this);
		var bg_w=$this.width(); 
		var bg_x=$this.position().left;
		bg.stop().animate({"width" : bg_w+"px", "left" : bg_x+"px"}, "fast"); 
		$this.stop().animate({"opacity":1}, "fast" );
		
		sub=$this.find("."+classN+"depth_2");

		if(sub.length !=0){
			sub.stop().slideDown("fast");
			preSub=sub;
		}
		preMain=$this; 
	}

	var leaveMove=function(target){
		var $this=target;
		var id=target.index();
		if(id != nowPage){
			$this.stop().animate({"opacity":0.6}, "fast" );
		}

		if(sub.length != 0){
			sub.stop().slideUp("fast");
		}
		
		if(nowPage>=0){
			bg.stop(true).animate({"width" : activeInfo.width+"px", "left" : activeInfo.x+"px"}, "fast"); 
			now_menu.stop().animate({"opacity":1}, "fast" );
		}else{
			bg.stop(true).animate({"width" : 0}, "fast"); 
		}
		
	}
	init();
}

$(document).ready(function(){
	var smGnb=new gnb();
})

