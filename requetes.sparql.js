requetesSparql = {
    genres:function () {
      return $.sparql("http://dbpedia.org/sparql")
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
          .limit(30);
          //.select(["?genre"])
         // .where('?genre', 'a', 'onto:MusicGenre')
    },
    albums:function (the_genre) {

        return  $.sparql("http://dbpedia.org/sparql")
            .prefix('onto', 'http://dbpedia.org/ontology/')
            .prefix('prop', 'http://dbpedia.org/property/')
            .prefix('res', 'http://dbpedia.org/resource/')
            .prefix('page', 'http://dbpedia.org/page/')
            .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
            .where("?album","a","onto:Album")
            .where("?album","rdfs:label","?albumName")
            .where("?album","onto:artist","?Artist")
            .where("?album","onto:genre","<"+the_genre+">")
            .where("?Artist", "rdfs:label", "?ArtistName")
            .where("?album", "prop:cover", "?albumCover")
            .filter("lang(?albumName) = 'en' && lang(?ArtistName) = 'en'")
            .limit(100)
            .groupby("?albumName");
    },

    tracks: function(albumUri) {

        return $.sparql("http://dbpedia.org/sparql")

            .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
            .select(["?track", "?name"])

            .where("?track",
                   "<http://dbpedia.org/property/album>",
                   "<"+albumUri+">")
            .where("?track","rdfs:label","?name")
            .filter("lang(?name) = 'en'")
            .limit(100);
    }
};
