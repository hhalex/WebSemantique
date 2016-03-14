var ImgCallbacks=[]
var AlbumsData={};
var wordsToDisplay=[];

var listenerOnClickWordCloud = function() {

$('#loader').show();
//  console.log($(this));
var the_genre = $(this).data('uri');
$('#mylightbox').empty();
console.log(the_genre);

requetesSparql['albums'](the_genre)
    .execute(function(res)
    {
      var i=0;
      for (el in res)
      {
          var currentAlbum = new Album();
          currentAlbum.init_from_dbpedia(el, res);
          currentAlbum.genre = the_genre;
          $('#mylightbox').append(currentAlbum.generateHTML());

          // Récupération de la Jaquette
          $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=File:"+res[el].cover+"&prop=pageimages&format=json&pithumbsize=300&callback=?", currentAlbum.callbackUpdateCoverFromWiki);

          // Récupération sparql des pistes
          if (typeof res[el].album != 'undefined')
                requetesSparql['tracks'](currentAlbum.getURI()).execute(currentAlbum.callbackUpdateTracks);

          i++;
      }

      $('#receiver').trigger('click');
      $('#loader').hide();

      return false;

    });

  };


$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    requetesSparql['genres']().execute(function(res) {
            var ul = $('<ul />');
            for (el in res)
            {
                if ('genre' in res[el])
                {
                  var dataweight = parseInt(res[el].popucalcul);

                  var wordToDisplay = {};
                  wordToDisplay.text = res[el].label.replace('&', 'n');
                  wordToDisplay.weight = dataweight;
                  wordToDisplay.handlers = {};
                  wordToDisplay.html = {
                    'data-genre': res[el].label.replace('&', 'n'),
                    'data-uri': res[el].genre.uri
                  };
                  wordToDisplay.handlers.click = listenerOnClickWordCloud;

                  wordsToDisplay.push(wordToDisplay);
                  //$('#wordcloud2').append(element);
                }
            }

            $("#wordscloud").jQCloud(wordsToDisplay, {
                height: 400
            });

            $('#wordcloud2').empty().append(ul);

            $('#wordcloud2 a').on('click', function() {

                $('#loader').show();

                var the_genre = $(this).data('uri');
                $('#mylightbox').empty();
                console.log(the_genre);

                requetesSparql['albums'](the_genre)
                    .execute(function(res)
                    {
                      var i=0;
                      for (el in res)
                      {
                          var currentAlbum = new Album();
                          currentAlbum.init_from_dbpedia(el, res);
                          currentAlbum.genre = the_genre;
                          $('#mylightbox').append(currentAlbum.generateHTML());

                          // Récupération sparql des pistes
                          if (typeof res[el].album != 'undefined')
                                requetesSparql['tracks'](currentAlbum.getURI()).execute(currentAlbum.callbackUpdateTracks);

                          // Opération Jaquette
                          $.ajax({
                            type: 'GET',
                            dataType: 'jsonp',
                            data:{
                              q: res[el].albumName,
                              index:'0',
                              limit:'1',
                              output: 'jsonp'
                            },
                            success: currentAlbum.callbackUpdateCover,
                            url:'https://api.deezer.com/search/album/'
                          });

                          i++;
                      }

                      $('#receiver').trigger('click');
                      $('#loader').hide();

                      return false;

                    });

            });

            $('#receiver').featherlight($('#mylightbox'));

            return false;
        });

});
