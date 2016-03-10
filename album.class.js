function Album() {

  var stillInDOM = true;
  var num;
  var artist;
  var name;
  //console.log(res[el].album)
  var uri;
  var self = this;

    this.init_from_dbpedia = function (el, res) {
    num = el;
    artist = {name:res[el].ArtistName, uri:''};
    name = res[el].albumName;
    //console.log(res[el].album)
    uri = '';
    if(typeof res[el].album != 'undefined')
      uri = res[el].album.uri
  };

    this.init_from_jamendo = function  (a,b)
  {

  };

    this.getURI = function () {
      return uri;
    }
    this.generateHTML = function(){
        var containing_div = $('<div />').addClass('place_holder');
        var album_div = $('<div />').addClass('album');
        var a_album_div = $('<a />', {href: '#'})
                .addClass('close')
                .addClass('secret');
        var img_a_album_div = $('<img />',
                                {src: 'pop_close.png',
                                 title: 'Fermer',
                                 alt: 'Fermer'})
                .addClass('btn_close');
        var cover_img = $('<img />',
                          {src:'http://www.wargamevault.com/shared_images/ajax-loader.gif',
                           alt: 'album_cover',
                           'data-id': el})
                .addClass('cover');
        var hidden_list = $('<div />')
                .addClass('secret')
                .addClass('list');
        var h2_hidden_list = $('<span />')
                .addClass('secret')
                .html(name);
        var h3_hidden_list = $('<span />')
                .addClass('secret')
                .html(artist.name);



        hidden_list.append(h2_hidden_list).append(h3_hidden_list);
        a_album_div.append(img_a_album_div);
        album_div.append(a_album_div).append(cover_img).append(hidden_list);
        containing_div.append(album_div);

        return containing_div;
    };

    this.getDOMElement = function() {
        return $("img[data-id='"+num+"']");
    };

    this.removeDOMElement = function () {
        if (stillInDOM){
          var tmp = self.getDOMElement().parent().parent();
            tmp.remove();
            stillInDOM=false;
        }
    };



    this.callbackUpdateCover = function(data) {
        var myelement=self.getDOMElement();

        if (data.total > 0)
        {
            AlbumsData[data.data['0'].id] = data.data['0'];

            if (data.data['0'].cover_medium){
              var tmpImg = new Image() ;
              tmpImg.src = data.data['0'].cover_medium ;
              tmpImg.onload = function() {
                // Run onload code.
            //    myelement.attr("src", tmpImg.src );
                myelement.parent(".album").fadeOut(1000, function() { myelement.attr("src", tmpImg.src ); myelement.parent(".album").fadeIn(2000); });
              } ;
            }

        }
        else self.removeDOMElement();

        return false;
    };

    this.callbackUpdateTracks = function(data) {
        var myelement=self.getDOMElement().parent(".album").find(".list");

        if(data.length > 0){
            var ul = $("<ul>");
            for ( el_ in data)
            {
                if ('track' in data[el_]){
                    var li = $("<li>");
                //    var a = $("<a>");
                //    a.attr("href", data[el_].track.uri);
                    li.text(data[el_].name);
                    li.attr('data-uri', data[el_].track.uri);
                    li.attr('data-releasedate', data[el_].releaseDate);
                    li.attr('data-name', data[el_].name);
                  //  li.append();
                    ul.append(li);
                }
            }
            myelement.append(ul);
        }
        else
            self.removeDOMElement();
        return false;
    };
}
