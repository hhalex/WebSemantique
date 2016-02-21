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
  $(".cover").click(function() {
    var img_src = $(this).attr("src");
    $('#popup').children().find("#mini").attr("src" , img_src);
    $('#popup').fadeIn();
    console.log('test');


  	//Effet fade-in du fond opaque
  	$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
  	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
  	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(function(){});

  	return false;
  });

  //Fermeture de la pop-up et du fond
  $(".close").click(function() { //Au clic sur le bouton ou sur le calque...
  	$('#fade , .popup_block').fadeOut(function() {
  		$('#fade').remove();
  	});
  	return false;
  });

});
