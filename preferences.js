function hoverCover(){

  $(this).parent().css("box-shadow", "10px 10px 5px #000000");
  $(this).css("width", "220px");
  $(this).css("height", "220px");
  $(".cover").css("filter", "graysaclae(100%)");

}
function leaveCover(){
  $(this).parent().css("box-shadow", "0px 0px 0px #000000");
  $(this).css("width", "200px");
  $(this).css("height", "200px");

}
function open() {


  $(".lightbox").off('click', '.album');
  $(".lightbox").off('mouseover', '.cover');
  $(".lightbox").off('mouseout', '.cover');



  $(this).css({

    position: 'fixed',
    display: 'block',
    color: 'white',
    boxShadow: "0px 0px 0px #000000",
    zIndex:'9999'
  });


  $(this).find(".cover").css('display', 'inline-block');
  $(".album").not(this).find('.cover').css(

    {
      filter: 'grayscale(100%)'
    }
  )

  $(this).css('background-color', 'black');


  $(this).find(".cover").animate({



    width :'220px',
    height: '220px',
    marginTop: '0px',
    marginLeft:'0px',
    marginRight:'0px',
    marginBottom:'0px',
  });

  $(this).animate({


    paddingRight: '10px',

    width: '440px',


    left :'50%',
    top: '50%',
    marginTop: '-200px',
    marginLeft: '-200px',


  },function(){

    $(this).find(".secret").not('h1').not('h2').css("display", "inline-block");
    $(this).find('h2').css("display" ,"block");
    $(this).find('h3').css("display", "block");


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
  $(".lightbox").on('click', '.close', close);




  return false;
}


$(document).ready(function(){


  $(".lightbox").on('click', '.album', open);
  $(".lightbox").on('mouseover', '.cover', hoverCover);
  $(".lightbox").on('mouseout', '.cover', leaveCover);
  $(".lightbox").on('click', '.close', close);

});
