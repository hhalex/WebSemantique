#! /bin/bash
rm -rf data/* $2> /dev/null
mkdir lib/ &2> /dev/null
#mkdir data/ &2> /dev/null
wget "http://viejs.org/js/vie-2.1.0.js" -O "lib/vie.js"
#wget "http://moustaki.org/resources/jamendo-rdf.tar.gz" -O "data/jamendo-rdf.tar.gz"
wget "http://code.jquery.com/jquery-1.12.0.min.js" -O "lib/jquery.js"
wget "https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/rdfquery/jquery.rdfquery.core.min-1.0.js" -O "lib/jquery-rdf.js"
wget "https://github.com/twbs/bootstrap/releases/download/v3.3.6/bootstrap-3.3.6-dist.zip" -O "lib/bootstrap.zip"
#wget "http://backbonejs.org/backbone-min.js" -O "lib/backbone.js"
#wget "http://underscorejs.org/underscore-min.js" -O "lib/underscore.js"

cd lib/
unzip -a *.zip
rm -f *.zip
cd ..

#$(cd ./lib && unzip *.zip && rm -f *.zip && cd ..)
#$(cd ./data && tar xzf *.tar.gz && rm -f *.tar.gz && cd ..)

echo "Installation finie"

