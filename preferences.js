function hoverCover(){

  $(this).addClass("coverHovered");

}
function leaveCover(){
  $(this).removeClass("coverHovered");

}
function open() {


  $(".lightbox").off('click', '.album');
  $(".lightbox").off('mouseover', '.cover');
  $(".lightbox").off('mouseout', '.cover');
  $(".lightbox").on('click', '.close', close);

  $(this).addClass('albumExtend');
  $(this).find(".cover").removeClass("coverHovered");
  $(this).find(".cover").css('display', 'inline-block');
  $(".album").not(this).find('.cover').css(

    {
      filter: 'grayscale(100%)',
      WebkitFilter: 'grayscale(100%)'
    }
  )



  $(this).find(".cover").animate({

    width :'300px',
    height: '300px',
    marginTop: '0px',
    marginLeft:'0px',
    marginRight:'0px',
    marginBottom:'0px',
  });

  $(this).animate({


    
    width: '600px',
    height: '300px',

    left :'50%',
    top: '50%',
    marginTop: '-150px',
    marginLeft: '-300px',


  },function(){

    $(this).find(".secret").addClass('secretExtended');



  });

  return false;
}

function close () {

  $(".secret").removeAttr("style");
  $(".cover").removeAttr("style");
  $(".album").removeAttr("style");
  $(".album").removeClass('albumExtend');
  $(".secret").removeClass('secretExtended');

  $(".lightbox").on('click', '.album', open);
  $(".lightbox").on('mouseover', '.cover', hoverCover);
  $(".lightbox").on('mouseout', '.cover', leaveCover);
  $(".lightbox").off('click', '.close');



  return false;
}


$(document).ready(function(){


  $(".lightbox").on('click', '.album', open);
  $(".lightbox").on('mouseover', '.cover', hoverCover);
  $(".lightbox").on('mouseout', '.cover', leaveCover);
  $(".lightbox").on('click', '.close', close);

});
