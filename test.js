var ImgCallbacks=[]
var AlbumsData={}
function callback_picture_album(data)
{
  console.log('here is');
  console.log(data);
}

$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    $.sparql("http://dbpedia.org/sparql")
        .prefix('onto', 'http://dbpedia.org/ontology/')
        .prefix('prop', 'http://dbpedia.org/property/')
        .prefix('res', 'http://dbpedia.org/resource/')
        .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        .select(["?genre", "?label", "?year", "COUNT(?artiste) AS ?popucalcul"])
    //    .select(["?genre", "?label", "?year", "COUNT(?ancestergenre) AS ?popucalcul"])
    //    .select(["?genre", "?label", "?year", "?album", "?album_name"])
        .where("?genre","a","onto:MusicGenre")
        .where("?genre","rdfs:label","?label")
        .where("?genre","prop:popularity","?year")
      //  .where("?genre", "onto:wikiPageLength", "?wikiPageLength")
      .where("?artiste", "dbo:genre", "?genre")
    //    .where("?ancestergenre", "onto:stylisticOrigin", "?genre")
//        .filter("xsd:nonNegativeInteger(?wikiPageLength) >= 1000")
    //    .where("?album","a","onto:Album")
    //    .where("?album","prop:genre","?genre")
    //    .where("?album","rdfs:label","?album_name")
        .filter("xsd:integer(?year) >= 1980")
        .filter("lang(?label) = 'fr'")

      //    .distinct("?album")
          .distinct("?genre")
        .orderby("DESC(?popucalcul)")
        .limit(30)
        //.select(["?genre"])
       // .where('?genre', 'a', 'onto:MusicGenre')
        .execute(function(res) {

            var ul = $('<ul />');

            for (el in res)
            {
                if ('genre' in res[el])
                {
                  var dataweight = parseInt((parseInt(res[el].year)-1980)*(1+Math.random()));
              /*    var element = $('<span />');
                  element.attr('data-weight', dataweight);
                //  var link = $('<a />', {'class': 'lightbox'});
                  var link = $('<a />', {href: '#'+res[el].genre.uri, 'class': 'lightbox'});
                  link.text(res[el].label.replace('&', 'n'));
                  element.append(link);*/
                  //
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
                // TODO ajouter requête sparql

                /*
                PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
                                PREFIX dbpprop: <http://dbpedia.org/property/>
                                PREFIX dbres: <http://dbpedia.org/resource/>
                                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                                SELECT *
                                WHERE {
                                    ?album a dbpedia-owl:Album.
                                    ?album rdfs:label ?albumName.
                                    ?album dbpedia-owl:artist ?Artist.
                                    ?album dbpedia-owl:genre dbres:Country_rock.
                                    ?album rdfs:label ?albumName.

                                   Filter (
                                    lang(?albumName)='en')
                }
                                GROUP BY ?album
                */

                var the_genre = $(this).data('uri');
                $('#mylightbox').empty();
                console.log(the_genre);

                $.sparql("http://dbpedia.org/sparql")
                    .prefix('onto', 'http://dbpedia.org/ontology/')
                    .prefix('prop', 'http://dbpedia.org/property/')
                    .prefix('res', 'http://dbpedia.org/resource/')
                    .prefix('page', 'http://dbpedia.org/page/')
                    .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
                  //  .select("*")
                    .where("?album","a","onto:Album")
                    .where("?album","rdfs:label","?albumName")
                    .where("?album","onto:artist","?Artist")
                    .where("?album","onto:genre","<"+the_genre+">")
                    .where("?Artist", "rdfs:label", "?ArtistName")
                    .where("?album", "prop:cover", "?albumCover")
                    .filter("lang(?albumName) = 'en' && lang(?ArtistName) = 'en'")
                    .limit(100)
                    .groupby("?albumName")
                    .execute(function(res)
                    {
                      var callbackGenerator=function(j){
                        return function (data)
                        {
                          var myelement=$("img[data-id='"+j+"']")
                          //console.log(data);
                          //console.log(myelement);
                          if (data.total > 0)
                          {
                            AlbumsData[data.data['0'].id] = data.data['0'];

                            if (data.data['0'].cover_medium)
                            {
                              myelement.attr("src", data.data['0'].cover_medium);
                              //alert(myelement);
                            }
                          }
                          else {
                            myelement.parent(".place_holder").remove()
                          }
                          return false;
                        };
                      }
                      var callbackGeneratorTracks=function(j){
                        return function (data)
                        {

                          var myelement=$("img[data-id='"+j+"']").parent(".album").find(".list");
                          console.log(j);
                          //console.log(data);
                          //console.log(myelement);
                          //myelement.html('pouf');
                          console.log(data)
                          if(data.length > 0){
                            var ul = $("<ul>");
                            for ( el in data)
                            {
                              if ('track' in data[el]){
                                var li = $("<li>");
                                var a = $("<a>");
                                a.attr("href", data[el].track.uri);
                                a.text(data[el].name);
                                li.append(a);
                                ul.append(li);
                              }

                            }
                            myelement.append(ul);
                          }
                          else {
                            myelement.parent().parent().remove();
                          }
                          return false;
                        };
                      }

                      var i=0;
                      for (el in res)
                      {

                          var containing_div = $('<div />').addClass('place_holder');
                          var album_div = $('<div />').addClass('album');
                          var a_album_div = $('<a />', {href: '#'}).addClass('close').addClass('secret');
                          var img_a_album_div = $('<img />', {src: 'pop_close.png', title: 'Fermer', alt: 'Fermer'}).addClass('btn_close');
                          var cover_img = $('<img />', {src: 'http://static.tumblr.com/2lqtwbf/coolyqooj/untitled-1.png', alt: 'album_cover', 'data-id': i}).addClass('cover');
                          var hidden_list = $('<div />').addClass('secret').addClass('list');
                          var h2_hidden_list = $('<span />').addClass('secret').html(res[el].albumName);
                          var h3_hidden_list = $('<span />').addClass('secret').html(res[el].ArtistName);



                          hidden_list.append(h2_hidden_list).append(h3_hidden_list);
                          a_album_div.append(img_a_album_div);
                          album_div.append(a_album_div).append(cover_img).append(hidden_list);
                          containing_div.append(album_div);
                          $('#mylightbox').append(containing_div);

                          // Récupération sparql des pistes
                          var thisCallbackTracks = callbackGeneratorTracks(i);
                          if (typeof res[el].album != 'undefined'){
                              $.sparql("http://dbpedia.org/sparql")
                                //.prefix('onto', 'http://dbpedia.org/ontology/')
                                //.prefix('prop', 'http://dbpedia.org/property/')
                                //.prefix('res', 'http://dbpedia.org/resource/')
                                //.prefix('page', 'http://dbpedia.org/page/')
                                .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
                                .select(["?track", "?name"])

                                //.where("?track","prop:album",res[el].album.uri)
                                .where("?track","<http://dbpedia.org/property/album>","<"+res[el].album.uri+">")
                                .where("?track","rdfs:label","?name")
                                .filter("lang(?name) = 'en'")
                                .limit(100)
                                //.where("?Artist", "rdfs:label", "?ArtistName")
                                //.where("?album", "prop:cover", "?albumCover")
                                //.filter("lang(?track) = 'en'")
                                .execute(thisCallbackTracks);
                              //.execute(thisCallbackTracks);
                            }

                          // Opération Jaquette
                          var thisCallback = callbackGenerator(i);

                          $.ajax({
                            type: 'GET',
                            dataType: 'jsonp',
                            data:{
                              q: res[el].albumName,
                              index:'0',
                              limit:'1',
                              output: 'jsonp'
                            },
                            success: thisCallback,
                            url:'https://api.deezer.com/search/album/'
                          });

                          i++;
                      }

                      $('#receiver').trigger('click');

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
