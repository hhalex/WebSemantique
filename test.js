$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    $.sparql("http://dbpedia.org/sparql")
        .prefix('onto', 'http://dbpedia.org/ontology/')
        .prefix('prop', 'http://dbpedia.org/property/')
        .prefix('res', 'http://dbpedia.org/resource/')
        .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        .select(["?genre", "?label", "?year"])
    //    .select(["?genre", "?label", "?year", "?album", "?album_name"])
        .where("?genre","a","onto:MusicGenre")
        .where("?genre","rdfs:label","?label")
        .where("?genre","prop:popularity","?year")
    //    .where("?album","a","onto:Album")
    //    .where("?album","prop:genre","?genre")
    //    .where("?album","rdfs:label","?album_name")
        .filter("xsd:integer(?year) >= 1980")
        .filter("lang(?label) = 'fr'")
      //    .distinct("?album")
          .distinct("?genre")
        //.orderby("xsd:integer(?nbA)")
        .limit(100)
        //.select(["?genre"])
       // .where('?genre', 'a', 'onto:MusicGenre')
        .execute(function(res) {
          $('#wordcloud2').empty();
            for (el in res)
            {
                if ('genre' in res[el])
                {
                  var dataweight = parseInt((parseInt(res[el].year)-1980)*(1+Math.random()));
                  $('#wordcloud2')
                  .append('<span data-weight="'+dataweight+'"><a href="' + res[el].genre.uri + '">'+res[el].label.replace('&', 'n')+'</a></span>');
                }
            }

              $("#wordcloud2").awesomeCloud({
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
              });


            return false;
        });
});
