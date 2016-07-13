"use strict";
$(document).ready(function(){
	// 플러그인 호출
	$(".sd2_toggle_list").toggleList();
	$(".sd2_forum_list").fadeList();
	$(".sd2_support_list").fadeList();
	$(".sd2_select_btn").selectBox();
});

(function($){
	var classN="sd2_"; 
	var active=classN+"active";

	function ToggleList(selector) {
		this.list=null;
		this.selected=null; 
		this.item=null; 
		this.preId=0;

		this.init(selector);
	}

	ToggleList.prototype.init=function(selector){
		this.list=$(selector);
		this.item=this.list.children("li");
		this.eventDefine();
	}

	ToggleList.prototype.eventDefine=function(){
		var objThis=this;
		this.item.on("click", function(){
			objThis.listClick($(this))
			return false; 
		});
	}

	ToggleList.prototype.listClick=function(item){
		if(this.selected){
			if(this.preId != item.index()){
				this.selected.children("div").eq(1).stop().slideUp(200)
				this.selected.removeClass(active);
			}
		}
		var showDiv=item.children("div").eq(1);
		showDiv.stop().slideToggle(200);
		item.toggleClass(active);
		this.selected=item;
		this.preId=item.index();
	}

	$.fn.toggleList=function(){
		this.each(function(index){
			var list = new ToggleList(this);
		})
		return this;
	}
	//toggleList

	function FadeList(selector) {
		this.forum=null;
		this.forumList=null;
		this.seleted=null; 
		this.seletedBox=null; 
		this.forumParent=null;
		this.parentH=0;
		this.speed=300;
		this.fadeSpeed=150;
		this.prevId=0;
		this.ease="easeOutCubic"; 

		this.init(selector);
	}

	FadeList.prototype.init=function(selector){
		this.forum=$(selector);
		this.forumList=	this.forum.children("li"); 
		this.forumParent=$("."+classN+"fade_wrap"); 
		this.parentH=this.forumParent.height();
		this.eventDefine();
	
	}
	
	FadeList.prototype.eventDefine=function(){
		var objThis=this
		this.forumList.on("mouseover", function(e){
			objThis.overFn($(this));
		});
	}

	FadeList.prototype.overFn=function(item){
		var $this=item; 
		var name=$this.attr("class").replace(active, "");
		var box=$("."+classN+"f_box");
		var boxSelector=box.find("."+name);

		if(this.seleted){
			if($this.index() != this.prevId){
				this.seletedBox.stop().fadeOut(this.fadeSpeed);
				this.seleted.removeClass(active); 
			}
		}

		if(boxSelector.length !=0){
			var boxH=boxSelector.outerHeight(true);
			var nowParentH=this.parentH+boxH; 
			boxSelector.stop().delay(100).fadeIn(this.fadeSpeed);
			this.forumParent.stop().animate({"height": nowParentH+ "px"}, this.speed, this.ease);
		}else{
			this.forumParent.stop().animate({"height": this.parentH+ "px"}, this.speed, this.ease);
		}
		$this.addClass(active); 
		this.seleted=$this; 
		this.seletedBox=boxSelector; 
		this.prevId=$this.index();
	
	}

	$.fn.fadeList=function(){
		this.each(function(index){
			var list = new FadeList(this);
		})
		return this;
	}
	//fadeList

	function SelectBox(selector){
		this.selectBtn=null; 
		this.init(selector); 
	}

	SelectBox.prototype.init=function(selector){
		this.selectBtn=$(selector); 
		this.eventDefine();
	}

	SelectBox.prototype.eventDefine=function(){
		var objThis=this; 
		this.selectBtn.on("click", function(){
			var item=$(this); 
			objThis.boxToggle(item); 
			return false; 
		})
	}

	SelectBox.prototype.boxToggle=function(item){
		var selectBox=item.next("div"); 
		selectBox.toggle(); 
		item.toggleClass(active);
		
		selectBox.find("li").on("click", function(){
			var selectTxt=$(this).text();
			item.text(selectTxt).removeClass(active); 
			selectBox.hide();
			return false; 
		})
	}

	$.fn.selectBox=function(){
		this.each(function(index){
			var selectForm=new SelectBox(this); 
		})
		return this; 
	}
})(jQuery)




