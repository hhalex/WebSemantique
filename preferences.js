$(document).ready(function(){

  var cover = $(".cover");

  cover.hover(function(){
    $(this).parent().css("box-shadow", "10px 10px 5px #000000");
    $(this).css("width", "330px");
    $(this).css("height", "330px");

  });
  cover.mouseleave(function(){
    $(this).parent().css("box-shadow", "0px 0px 0px #000000");
    $(this).css("width", "300px");
    $(this).css("height", "300px");

  });



});
