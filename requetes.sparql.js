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
          .filter("lang(?label) = 'en'")

        //.distinct("?album")
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
            .select(["?album", "?Artist", "?ArtistName", "?cover", "?albumName", "COUNT(?track) AS ?popucalcul"])
            .where("?album","a","onto:Album")
            .where("?album","rdfs:label","?albumName")
            .where("?album","onto:artist","?Artist")
            .where("?album","onto:genre","<"+the_genre+">")
            .where("?track", "prop:album", "?album")
            .where("?album", "prop:cover", "?cover")
            .where("?Artist", "rdfs:label", "?ArtistName")
            //.where("?album", "prop:cover", "?albumCover")
            .filter("lang(?albumName) = 'en' && lang(?ArtistName) = 'en'")
            .orderby("DESC(?popucalcul)")
            .limit(300)
            .groupby("?albumName");
    },

    tracks: function(albumUri) {

        return $.sparql("http://dbpedia.org/sparql")
            .prefix('onto', 'http://dbpedia.org/ontology/')
            .prefix('prop', 'http://dbpedia.org/property/')
            .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
            .prefix('foaf','http://xmlns.com/foaf/0.1/')
            .select(["?track", "?name", "?releaseDate", "?artist", "?artistName"])

            .where("?track",
                   "<http://dbpedia.org/property/album>",
                   "<"+albumUri+">")
            .where("?track","rdfs:label","?name")
            .where("?track", "onto:releaseDate", "?releaseDate")
            .where("?track", "onto:artist", "?artist")
            .where("?artist", "rdfs:label", "?artistName")
          //.where("?artist", "foaf:based_near", "?place")
            .filter("lang(?name) = 'en' && lang(?artistName) = 'en'")
            .groupby("?name")
            .limit(100);
    },
    'recommandation-jamendo': function(length) {

        return $.sparql("http://localhost:8890/sparql", {localhost:true})
            .prefix('mo','http://purl.org/ontology/mo/')
            .prefix('rdfs','http://www.w3.org/2000/01/rdf-schema#')
            .prefix('foaf','http://xmlns.com/foaf/0.1/')
            .prefix('xs', 'http://www.w3.org/2001/XMLSchema')
            .prefix('fn', 'http://www.w3c.org/2005/xpath-functions#')
            //.select(["?record", "?recordName", "?artist", "?artistName"])
            .select(["distinct(?artist)", "?artistName", "?cover"])
            .where("?artist", "a", "mo:MusicArtist")

            .where("?artist", "foaf:name", "?artistName")
            //.where("?artist", "foaf:made", "?record")
            .where("?artist", "foaf:img", "?cover")
            //.where("?record", "foaf:name", "?recordName")

            .filter("op:numeric-greater-than(op:numeric-add(fn:string-length(?artistName), xs:integer(2)),  "+length+")")//" && op:numeric-less-than( op:numeric-subtract(fn:string-length(?recordName), xs:integer(2)), "+length+")")
          //.where("?artist", "foaf:based_near", "?place")
            .groupby("?artist")
            .limit(100);
    }
};
