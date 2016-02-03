$(document).ready(function () {
    $("#list").empty();
    $("#list").append('<li><b>Liste des genres</b></li>');
    $.sparql("http://dbpedia.org/sparql")
        .prefix('onto', 'http://dbpedia.org/ontology/')
        .prefix('prop', 'http://dbpedia.org/property/')
        .prefix("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        .select(["?genre"])
        .where("?genre","a","onto:MusicGenre")
        .limit(100)
        //.select(["?genre"])
       // .where('?genre', 'a', 'onto:MusicGenre')
        .execute(function(res) {
            alert("aa");
            for (el in res)
                $('#list')
                .append('<li>' + res[el].genre.uri + '</li>');
            return false;
        });
});
