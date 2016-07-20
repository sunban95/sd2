"use strict";
$(window).load(function(){
	// 플러그인 호출
	//$(".sd2_toggle_list").toggleList().openItem(0);
	$(".sd2_toggle_list").showHidden();
	$(".sd2_forum_list").fadeList();
	$(".sd2_support_list").fadeList();
	$(".sd2_select_btn").selectBox();
	$(".sd2_more_less_btn").moreLess();
	$(".sd2_show_line").showLine(false);
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
		this.item.find("."+classN+"question_wrap a").on("click", function(){// 수정
			var clickItem=$(this).parents("li");//수정
			objThis.listClick(clickItem);
			return false;
		});
		//
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

	function ShowHidden(selector){//
		this.init(selector);//
		this.allEvent();
	}//
	ShowHidden.prototype=new ToggleList();//
	ShowHidden.prototype.allEvent=function(){
		var thisObj=this;
		$(".show").on("click", function(){
			thisObj.item.find(".sd2_answer_wrap").slideDown(200);
			thisObj.item.addClass(active);
			return false;
		})
		$(".hidden").on("click", function(){
			thisObj.item.find(".sd2_answer_wrap").slideUp(200);
			thisObj.item.removeClass(active);
			return false;
		})
	}

	$.fn.toggleList=function(){
		this.each(function(selectIndex){
			var list = new ToggleList(this);
			$(this).data("list", list);//추가
		})
		return this;
	}
	//toggleList


	//추가 시작
	$.fn.openItem=function(selectIndex){
		this.each(function(){
			var list=$(this).data("list");
			if(list){
				list.listClick(list.item.eq(selectIndex))
			}
		})
	}//openitem 추가 끝

	$.fn.showHidden=function(){
		this.each(function(index){
			var list=new ShowHidden(this);
		})
		return this;
	}

//-------------------------------------
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

	function MoreLess(selector){
		this.moreLessBtn=null;
		this.viewContainer=null;
		this.init(selector);
	}

	MoreLess.prototype.init=function(selector){
		this.moreLessBtn=$(selector).find("a") ;
		this.viewContainer=$(selector).prev();
		this.eventDefine();
	}

	MoreLess.prototype.eventDefine=function(){
		var now_h=this.viewContainer.height();
		var all_h=this.viewContainer.children("div:first")[0].scrollHeight;
		var remove="";
		var add="";
		var txt="";
		var h=0;
		var objThis=this;

		this.moreLessBtn.on("click", function(){
			var $this=$(this);
			if($this.hasClass(classN+"more")){
				remove="more";
				add="less";
				txt="less";
				h=all_h;
			}else{
				remove="less";
				add="more";
				txt="more";
				h=now_h;
			}

			objThis.viewContainer.animate({"height":h+"px"}, 2000, "easeOutCubic", function(){
				$this.removeClass(classN+remove).addClass(classN+add).text(txt);
			});
			return false;
		})

		//시작
	}

	$.fn.moreLess=function(){
		this.each(function(index){
			var moreLessBtn = new MoreLess(this);
		})
		return this;
	}

	function ShowLine(selector, isShowLine){
		this.showCheckbox=null;
		if(window.Prism) {
			this.init(selector, isShowLine);
		} else {
			return;
		}
	}

	ShowLine.prototype.init=function(selector, isShowLine){
		this.showCheckbox=$(selector);
		this.eventDefine();

		if(!isShowLine) { // 라인 숨기기
			setTimeout(function() {
				if ("createEvent" in document) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					$(selector)[0].dispatchEvent(evt);
				} else {
					$(selector)[0].fireEvent("onchange");
				}
			}, 100);
			this.showCheckbox[0].checked = false;
		} else { // 라인 표기
			this.showCheckbox[0].checked = true;
		}
	}

	ShowLine.prototype.eventDefine=function(){
		var objThis=this;
		this.showCheckbox.on("change", function(){
			var item=$(this),
				isShowLine = $(this).closest(".sd2_code_wrap").find(".sd2_is_show_line"),
				lineRows = $(this).closest(".sd2_code_wrap").find(".line-numbers-rows"),
				linePre = $(this).closest(".sd2_code_wrap").find("pre");

			lineRows.toggle();
			linePre.toggleClass("line-numbers");
			return false;
		})
	}
	$.fn.showLine=function(isShowLine){
		this.each(function(index){
			var showLine=new ShowLine(this, isShowLine);
		})
		return this;
	}

})(jQuery)


