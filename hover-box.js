/* mobile support for hover box */
/* mobile user required double click to enter list */
$(function() {
	var mobileScreenTreshold = 1024;
	$(".hvrbox").click(function(e) {
		if($(window).width() <= mobileScreenTreshold) {
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				e.preventDefault();
				$(this).addClass("active");
			}
		} else {
			$(this).removeClass("active");
		}
	});
});

/* hide food name during hover */
$(".hvrbox")
	.mouseenter(function(){
		$(this).find(".centered").css("opacity", "0");
	}).mouseleave(function(){
		$(this).find(".centered").css("opacity", "1");
	})