$(document).ready(function(){




  function hoverCover(){

    $(this).parent().css("box-shadow", "10px 10px 5px #000000");
    $(this).css("width", "330px");
    $(this).css("height", "330px");
    $(".cover").css("filter", "graysaclae(100%)");

  }
  function leaveCover(){
    $(this).parent().css("box-shadow", "0px 0px 0px #000000");
    $(this).css("width", "300px");
    $(this).css("height", "300px");

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

    $(this).css('background-color', 'black');


    $(this).find(".cover").animate({



      width :'330',
      height: '330',
      marginTop: '0px',
      marginLeft:'0px',
      marginRight:'0px',
      marginBottom:'0px',
    });

    $(this).animate({


    	paddingRight: '10px',

      width: '550px',


      left :'50%',
      top: '50%',
      marginTop: '-200px',
      marginLeft: '-200px',


    },function(){

      $(this).find(".hidden").not('h1').not('h2').css("display", "inline-block");
      $(this).find('h2').css("display" ,"block");
      $(this).find('h3').css("display", "block");


    });





  	//Effet fade-in du fond opaque
  	$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
  	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
  	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(function(){});

  	return false;
  }


  $(".album").on('click',open);
  $(".cover").on('mouseover',hoverCover);
  $(".cover").on('mouseout', leaveCover);

  $(".close").click(function() {
    console.log('test_close');
  	$('#fade').fadeOut(function() {
  		$('#fade').remove();
  	});
    $(this).parent().children().not("img").css("display", "none");
    $(this).parent().on();
    $(this).parent().css({

      position: 'relative',
      display: 'inline-block',

    });


    $(this).parent().find(".cover").css('display', 'block');

    $(this).parent().css('background-color', 'none');
    $(this).parent().find(".cover").animate({

      // width:'300px',
      // height:'300px',
      // marginTop: 'auto',
      // marginBottom: 'auto',
      // marginLeft: 'auto',
      // marginRight: 'auto'


    },function(){});

    $(this).parent().animate({


      // padding: '0px',
      //
      // width: '330px',
      // height: '330px',
      // left:'',
      // top:'',
      //
      // marginTop: '10px',
      // marginBottom: '10px',
      // marginLeft: '10px',
      // marginRight: '10px',


      },function(){


        $(".cover").removeAttr("style");
        $(".album").removeAttr("style");

        $(".album").on('click',open);
        $(".cover").on('mouseover',hoverCover);
        $(".cover").on('mouseout',leaveCover);


      });

  	return false;
  });


});
