# WebSemantique

Projet dans le cadre de la mineure 5 Web Sémantique de Supélec

L'idée est de faire un petit moteur de recommendation en Javascript à l'aide du framework VIE.js qui permet de manipuler des données RDF utilisant une ontologie particulière.

Ce moteur de recommendation se baserait sur l'ontologie [Schema.org](http://schema.org) et les données de Jamendo

Un fichier **fetch_all.sh** est à exécuter afin de rapatrier les librairies et données, afin d'avoir tout sur le pc, et pouvoir effectuer des requêtes plus rapides. 


- il faut créer un formulaire modélisant les préférences d'un utilisateur, en reliant chaque potentiel choix à une URI de schema.org
- il faut écrire les requêtes avec VIE (en piochant dans le fichier RDF de jamendo) tenant compte de ces préférences
- mettre en forme les résultats