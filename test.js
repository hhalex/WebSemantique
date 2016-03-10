var ImgCallbacks=[]
var AlbumsData={};

$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    requetesSparql['genres']().execute(function(res) {
            var ul = $('<ul />');
            for (el in res)
            {
                if ('genre' in res[el])
                {
                  var dataweight = parseInt((parseInt(res[el].year)-1980)*(1+Math.random()));

                  //data-featherlight
                  var li = $('<li />');
                  var a = $('<a />', {href: '#'});
                //  var a = $('<a />', {href: res[el].genre.uri});
                  a.text(res[el].label.replace('&', 'n'));
                  a.data('featherlight', '#mylightbox');
                  a.data('genre', res[el].label.replace('&', 'n'));
                  a.data('uri', res[el].genre.uri);
                  li.append(a);
                  ul.append(li);
                  //$('#wordcloud2').append(element);
                }
            }

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
                          var currentAlbum = new Album(el, res);
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

                // TODO ajouter les albums issus de la requête sparql dans #mylightbox
                // TODO permettre la sélection
                // TODO retenir quelque part qu'est-ce-qui  a été sélectionné
              //  $('#mylightbox').html('<strong>'+$(this).data('genre')+'</strong>');
            });

            $('#receiver').featherlight($('#mylightbox'));


            return false;
        });

});
