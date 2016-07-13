"use strict";
var lnb=function(){
	
	var lnb=null;
	var lnb_wrap=null; 
	var cromeBool=null; 
	var top_margin=36; 
	var lnbT=0;
	var marginT=0;
	var lnb_h=0;
	var seleted=null;
	var classN="sd2_"; 
	var active=classN+"active";

	var init=function(){
		lnb=$("."+classN+"lnb_container"); 
		lnb_wrap=lnb.parent(); 
		lnbT=$(".sd2_header_2_wrap").height();
		marginT=parseInt(lnb.css("margin-top"));

		var agent = navigator.userAgent.toLowerCase();
		cromeBool=agent.indexOf("chrome") != -1;

		eventDefine();
	}//init

	var eventDefine=function(){
		$(window).resize(lnbHeight); 
		$(window).trigger("resize");
		$(window).scroll(scrollFn);
		lnb.find("a").on("click", clickFn); 
	}//eventDefine

	var lnbHeight=function(){
		var win_h=$(window).height(); 
		//lnb_h=win_h - $(".header_1_wrap").height() - $(".header_2_wrap").height() - (marginT * 2); 
		lnb_h=win_h - $(".header_1_wrap").height() - $(".header_2_wrap").height() - marginT; 
		
		if(!cromeBool){
			checkH();
		}
		lnb.css("height", lnb_h+"px" ); 
		
	}//lnbHeight

	var checkH=function(){
		if(!cromeBool){
			if($(".lnb_dep1").height() <= lnb_h){
				lnb.css({"border-right":"3px solid #f4f4f4", "overflow":"hidden"});
			}else{
				lnb.css({"border":"none", "overflow":"auto"});
			}
		}
	}

	var scrollFn=function(){
		var scrollT=$(window).scrollTop();
		var winH=$(window).height();
		var elH=$("#wrap").height() - $(".footer_wrap").height() + marginT;

		if(top_margin <= scrollT){
			lnb_wrap.css({"position":"fixed", "top":lnbT+"px"});
			if(scrollT + winH >= elH){
				var currentT=(scrollT + winH) - elH;
				lnb_wrap.css({"position":"fixed", "top":(lnbT - currentT - marginT)+"px"});
			}
		}else{
			lnb_wrap.css({"position":"static"})
		}
	}//scrollFn

	var clickFn=function(e){
		var $this=$(this); 
		var subBool=Boolean($this.next("ul").length);
		var speed=400;
		var parent=$this.parents("ul").attr("class").replace("lnb_", ""); 

		if(seleted){
			console.log("in")
			seleted.parent().toggleClass(active);
		}
		
		if(subBool){
			$this.siblings("ul").slideToggle(speed, function(){
				checkH();
			}); 
		}

		$this.parent().toggleClass(active);

		var id_name=$this.attr("href");
		if(id_name != "#"){
			var posY=$(".substance_wrap").find(id_name).offset().top - 50;
			$( 'html, body' ).stop().animate( { scrollTop : posY+"px" } ) ;
		}
		
		seleted=$this;
		return false;
	}

	init();
}

$(document).ready(function(){
	var lnb_menu=new lnb(); 
})

