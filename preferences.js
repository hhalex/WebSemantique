$(document).ready(function(){


  // for each(tracks as track){
  //   var place_holder= $("<div>",
  //     {
  //       "class" : "place_holder"
  //       }
  //
  //   );
  // place_holder.html(  '<div class="album"> <a href="#" class="close secret"> <img src="pop_close.png" class="btn_close" title="Fermer" alt="Fermer" /> </a> <img class="cover" src="" alt="album_cover"/> <div class="secret list" > <h2 class="secret"></h2> <h3 class="secret"></h1> <ul class="secret"> </ul> </div> </div>');
  // place_holder.find("h1")
  // }
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

    $(".cover").off();
    $(".album").off();
    $(this).css({

      position: 'fixed',
      display: 'block',
      color: 'white',
      boxShadow: "0px 0px 0px #000000",
      zIndex:'9999'
    });


    $(this).find(".cover").css('display', 'inline-block');
    $(this).find(".cover").attr('id', 'selected');
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


  $(".album").on('click',open);
  $(".cover").on('mouseover',hoverCover);
  $(".cover").on('mouseout', leaveCover);

  function close () {



    $(this).parent().children().not("img").css("display", "none");
    $(this).parent().on();
    $(this).parent().css({

      position: 'relative',
      display: 'inline-block',

    });


    $(this).parent().find(".cover").css('display', 'block');

    $(this).parent().css('background-color', 'none');




        $(".cover").removeAttr("style");
        $(".album").removeAttr("style");

        $(".album").on('click',open);
        $(".cover").on('mouseover',hoverCover);
        $(".cover").on('mouseout',leaveCover);




  	return false;
  }
  $(".close").on("click", close);
  $(".featherLight-close-icon").on("click", close);



});
