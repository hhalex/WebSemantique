$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    $.sparql("http://dbpedia.org/sparql")
        .prefix('onto', 'http://dbpedia.org/ontology/')
        .prefix('prop', 'http://dbpedia.org/property/')
        .prefix('res', 'http://dbpedia.org/resource/')
        .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        .select(["?artist", "?label", "?numberofalbums"])
    //    .select(["?genre", "?label", "?year", "COUNT(?ancestergenre) AS ?popucalcul"])
    //    .select(["?genre", "?label", "?year", "?album", "?album_name"])
        .where("?artist","a","onto:MusicalArtist")
        .where("?artist","rdfs:label","?label")
        .where("?artist", "onto:numberOfAlbums", "?numberofalbums")
    //    .where("?artist","prop:popularity","?year")
      //  .where("?genre", "onto:wikiPageLength", "?wikiPageLength")
        .where("?artiste", "dbo:genre", "?genre")
    //    .where("?ancestergenre", "onto:stylisticOrigin", "?genre")
//        .filter("xsd:nonNegativeInteger(?wikiPageLength) >= 1000")
    //    .where("?album","a","onto:Album")
    //    .where("?album","prop:genre","?genre")
    //    .where("?album","rdfs:label","?album_name")
      //  .filter("xsd:integer(?year) >= 1980")
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
                // TODO ajouter les albums issus de la requête sparql dans #mylightbox
                // TODO permettre la sélection
                // TODO retenir quelque part qu'est-ce-qui  a été sélectionné
                $('#mylightbox').html('<strong>'+$(this).data('genre')+'</strong>');
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
