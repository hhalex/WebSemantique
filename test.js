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
                  var a = $('<a />', {href: res[el].genre.uri});
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
                SELECT distinct *
                WHERE {
                    ?album a dbpedia-owl:Album .
                    ?album rdfs:label ?albumName.
                    ?album dbpedia-owl:artist ?Artist.
                    ?album dbpedia-owl:genre dbres:Country_rock.
                Optional{
                    ?album dbpedia-owl:releaseDate ?date.
                    ?album dbpprop:title ?title.
                }
                Filter (
                    lang(?albumName)='en')
                }
                */

                $.sparql("http://dbpedia.org/sparql")
                    .prefix('onto', 'http://dbpedia.org/ontology/')
                    .prefix('prop', 'http://dbpedia.org/property/')
                    .prefix('res', 'http://dbpedia.org/resource/')
                    .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
                    .select(["?album", "?albumName", "?Artist", "?date", "?title"])
                    .where("?album","a","onto:MusicGenre")
                    .where("?album","rdfs:label","?albumName")
                    .where("?album","onto:artist","?Artist")
                    .where("?album","onto:genre","res:"+the_genre)
                    .optional("?album", "onto:releaseDate", "?date")
                    .optional("?album", "prop:title", "?title")
                    .filter("lang(?albumName) = 'en'")
                    .distinct("?album")
                    .limit(30)
                    .execute(function(res)
                    {
/*      <div class="place_holder">
        <div class="album" >
          <a href="#" class="close hidden">
            <img src="pop_close.png" class="btn_close" title="Fermer" alt="Fermer" />
          </a>



          <img class="cover" src="cover.jpg" alt="album_cover"/>
          <div class="hidden list">
            <h2 class="hidden">The 2nd Law</h2>
            <h3 class="hidden">unsustainable</h1>

              <ul class="hidden">
                <li>musique</li>
                <li>musique</li>
                <li>musique</li>
              </ul>
          </div>
        </div>
      </div>*/



                      for (el in res)
                      {
                        var containing_div = $('<div />').addClass('place_holder');
                        var album_div = $('<div />').addClass('album');
                        var a_album_div = $('<a />', {href: '#'}).addClass('close').addClass('hidden');
                        var img_a_album_div = $('<img />', {src: 'pop_close.png', title: 'Fermer', alt: 'Fermer'}).addClass('btn_close');
                        var cover_img = $('<img />', {src: 'cover.jpg', alt: 'album_cover'}).addClass('cover');
                        var hidden_list = $('<div />').addClass('hidden').addClass('list');
                        var h2_hidden_list = $('<h2 />').addClass('hidden').text('The 2nd Law');
                        var h3_hidden_list = $('<h3 />').addClass('hidden').text('unsustainable');
                        var ul_hidden = $('<ul />').addClass('hidden');
                        var li_musique = $('<li />').text('musique');

                        ul_hidden.append(li_musique).append(li_musique).append(li_musique);
                        hidden_list.append(ul_hidden).append(h3_hidden_list).append(h2_hidden_list);
                        a_album_div.append(img_a_album_div);
                        album_div.append(hidden_list).append(cover_img).append(a_album_div);
                        containing_div.append(album_div);
                        $('#myligthbox').append(containing_div);
                      }


                    });

                // TODO ajouter les albums issus de la requête sparql dans #mylightbox
                // TODO permettre la sélection
                // TODO retenir quelque part qu'est-ce-qui  a été sélectionné
              //  $('#mylightbox').html('<strong>'+$(this).data('genre')+'</strong>');
            });

            $('#wordcloud2 a').featherlight($('#mylightbox'));

            /*  $("#wordcloud2").awesomeCloud({
                "size" : {
                  "grid" : 9,
                  "factor" : 1
                },
                "options" : {
                  "color" : "random-dark",
                  "rotationRatio" : 0.35
                },
                "font" : "'Times New Roman', Times, serif",
                "shape" : "circle"
              });*/

            return false;
        });
});
