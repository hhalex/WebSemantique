#! /bin/bash
mkdir lib/ &2> /dev/null
mkdir data/ &2> /dev/null
wget "http://viejs.org/js/vie-2.1.0.js" -O "lib/vie.js"
wget "http://moustaki.org/resources/jamendo-rdf.tar.gz" -O "data/jamendo-rdf.tar.gz"
wget "http://code.jquery.com/jquery-1.12.0.min.js" -O "lib/jquery.js"

cd data && tar xzvf *.tar.gz && rm -f *.tar.gz &2> /dev/null && cd ..

echo "Installation finie"

