$(document).ready(function(){		
	$("#navlist .active-trail").next().css("padding-left","0px"); 
	$("#navlist li").hover(
		
		function(){
			$(this).css({"background-position":"1px 0px","background-color":"none"});
			$(this).next().css({"background-position":"1px 0px","background-color":"none"});
		},
		function(){
			$(this).css({"background-position":"0px 0px","background-color":"#fff"});
			$(this).next().css({"background-position":"0px 0px","background-color":"#fff"});
		}
		
	);
	var throbbing = '<span class="views-throbbing">&nbsp;</span>';
	Drupal.behaviors.customExposedFilterOnSelectChange = function(context) {
	  $('.views-exposed-form .views-submit-button', context).css("display","none");
	  $('.views-exposed-form .views-widget select').each(function(){
		var flag = true;

		//If this is accessory page, hide the style.
		if($(this).val() == 9){
			$('.views-exposed-form .views-exposed-widget.views-widget-filter-tid_1').css("display","none");
		}
			
		$(this).unbind("change").bind("change",function(){
		
			//If this is accessory page, hide the style.
			if($(this).val() == 9){
				$('.views-exposed-form .views-exposed-widget.views-widget-filter-tid_1').fadeOut();
			}else{
				$('.views-exposed-form .views-exposed-widget.views-widget-filter-tid_1').fadeIn()
			}
			
			$(this).parents(".views-exposed-form").append(throbbing);
			$(this).parents("form").submit();
		});
	  });
	};	
  Drupal.behaviors.customExposedFilterOnSelectChange();
  $(".views-field-tid img").each(function(){
    $(this).attr("title","");
  });


  $("#quicktabs-facebook_and_tweets .quicktabs_tabs li a").click(function() {
   	if($(this).parent().hasClass("dropdown_close")){
   		$(this).parent().removeClass("dropdown_close");
   		$(this).parent().siblings().show();
  	}else{
  		$(this).parent().siblings().hide();
	  	$(this).parent().addClass("dropdown_close").show();  		
  	}
  	$(this).parent().parent().prepend($(this).parent());
	});

	$("#quicktabs-facebook_and_tweets .quicktabs_tabs li").click(function(){
		$(this).find("a").click();
	});
	$("#quicktabs-facebook_and_tweets .quicktabs_tabs li").eq(0).click();
});
 