var selectedTracks=[];
function hoverCover(){

  //$(this).parent().css("box-shadow", "10px 10px 3px #888");
  $(this).addClass("coverHovered");
  //css("width", "220px");
  //$(this).css("height", "220px");


}
function leaveCover(){
  //$(this).parent().css("box-shadow", "0px 0px 0px #000000");
  $(this).removeClass("coverHovered");
  //$(this).css("width", "200px");
  //$(this).css("height", "200px");

}
function selectTrack(){
  if($(this).hasClass("selected")){

    $(this).removeClass("selected");
    $(this).find("img").remove();
    // selectedTracks.remove($(this).atrr("data-uri"));


  }
  else{
    var v = $("<img>");

    v.attr("src", "selected.png");


    $(this).addClass("selected");
    $(this).append(v);

    // selectTrack.push($(this).atrr("data-uri"));
  }
}
function open() {

  $(".lightbox").off('click', '.album');
  $(".lightbox").off('mouseover', '.cover');
  $(".lightbox").off('mouseout', '.cover');
  $(".lightbox").on('click', '.close', close);
  $(".lightbox").on('click', 'li', selectTrack);


  $(this).css({

    position: 'fixed',
    display: 'block',
    color: 'white',
    boxShadow: "0px 0px 0px #000000",
    zIndex:'9999'
  });


  $(this).find(".cover").removeClass("coverHovered");
  $(".album").not(this).find('.cover').css(

    {
      opacity:0.3,
      filter: 'grayscale(100%)'
    }
  )

  $(this).css('background-color', 'black');


  $(this).find(".cover").stop().animate({
    width :'220px',
    height: '220px',
    marginTop: '0px',
    marginLeft:'0px',
    marginRight:'0px',
    marginBottom:'0px'
  });

  $(this).stop().animate({
    paddingRight: '10px',

    width: '440px',
    left :'50%',
    top: '50%',
    marginTop: '-200px',
    marginLeft: '-220px',


  },function(){

    $(this).find(".secret").show();


  });







  return false;
}

function close () {






  $(".secret").removeAttr("style");
  $(".cover").removeAttr("style");
  $(".album").removeAttr("style");

  $(".lightbox").on('click', '.album', open);
  $(".lightbox").on('mouseover', '.cover', hoverCover);
  $(".lightbox").on('mouseout', '.cover', leaveCover);
  $(".lightbox").off('click', '.close');
  $(".lightbox").off('click', 'li');




  return false;
}


$(document).ready(function(){


  $(".lightbox").on('click', '.album', open);
  $(".lightbox").on('mouseover', '.cover', hoverCover);
  $(".lightbox").on('mouseout', '.cover', leaveCover);


});
