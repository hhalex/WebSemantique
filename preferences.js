$(document).ready(function(){

  var cover = $(".cover");

  cover.hover(function(){

    $(this).parent().css("box-shadow", "10px 10px 5px #000000");
    $(this).css("width", "330px");
    $(this).css("height", "330px");
    $(".cover").css("filter", "graysaclae(100%)");

  });
  cover.mouseleave(function(){
    $(this).parent().css("box-shadow", "0px 0px 0px #000000");
    $(this).css("width", "300px");
    $(this).css("height", "300px");

  });


  //Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
  $(".album").click(function() {

    $(this).not(".close").off();
    $(this).css({

      position: 'fixed',
      display: 'block',
      color: 'white'
    });

    $(".cover").off();
    $(this).find(".cover").css('display', 'inline-block');

    $(this).css('background-color', 'black');
    $(this).find(".cover").animate({

      width:'200px',
      height:'200px',

      marginTop:'0px',
      marginLeft:'0px',
      marginRight:'0px',
      marginBottom:'0px',
    });
    $(this).animate({


    	padding: '10px',

      width: '400px',
      height: '400px',

      left :'50%',
      top: '50%',
      marginTop: '-200px',
      marginLeft: '-200px',
    	zIndex: '99999'

    },function(){

      $(this).find(".hidden").css("display", "inline-block")
    });






  	//Effet fade-in du fond opaque
  	$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
  	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
  	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(function(){});

  	return false;
  });




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

      width:'300px',
      height:'300px'


    });
    $(this).parent().animate({


      padding: '0px',

      width: '330px',
      height: '330px',
      left:'0%',
      top:'0%',

      margin: '10px',
      zIndex: '0'

    });
    $(".cover").on();
    $("album").on();
  	return false;
  });

});
