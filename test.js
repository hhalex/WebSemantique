$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    $.sparql("http://dbpedia.org/sparql")
        .prefix('onto', 'http://dbpedia.org/ontology/')
        .prefix('prop', 'http://dbpedia.org/property/')
        .prefix('res', 'http://dbpedia.org/resource/')
        .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        .select(["?genre", "?label", "?year", "?album", "?album_name"])
        .where("?genre","a","onto:MusicGenre")
        .where("?genre","rdfs:label","?label")
        .where("?genre","prop:popularity","?year")
        .where("?album","a","onto:Album")
        .where("?album","prop:genre","?genre")
        .where("?album","rdfs:label","?album_name")
        .filter("xsd:integer(?year) > 2000 and xsd:integer(?year) < 2010")
        .filter("lang(?label) = 'en' or lang(?label) = 'fr'")
          .distinct("?album")
          .distinct("?label")
        //.orderby("xsd:integer(?nbA)")
        .limit(100)
        //.select(["?genre"])
       // .where('?genre', 'a', 'onto:MusicGenre')
        .execute(function(res) {
            alert("aa");
            for (el in res)
                $('#list')
                .append('<li><a href="' + res[el].album.uri + '">'+res[el].album_name+'</a> (genre <a href="' + res[el].genre.uri + '">'+res[el].label+'</a>) : '+res[el].year+'</li>');
            return false;
        });
});
