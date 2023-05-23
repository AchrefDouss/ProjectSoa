# Soa Project

Microservices with gRPC, GraphQL and REST

# client.proto

Ce code est écrit en syntaxe Proto3 et définit un message "Client" contenant des champs de données tels que "id", "nom_prenom", "num_tel", "email", etc. Il définit également des messages de requête et de réponse pour les méthodes "GetClient" et "SearchClients" du service "ClientService", permettant de récupérer un client par ID ou de rechercher des clients. Le code définit également une méthode "CreateClient" pour créer un nouveau client. Ces messages et méthodes peuvent être utilisés pour communiquer avec un serveur gRPC.

# clientMicroservices :

Ce code est un exemple d'utilisation de gRPC (un framework pour la communication entre différents services). Il s'agit d'un service client qui répond à trois méthodes : "GetClient", "SearchClients" et "CreateClient".

Le code commence par importer les bibliothèques nécessaires pour gRPC et charger le fichier proto "client.proto". Ensuite, il définit un objet "clientService" qui implémente les méthodes du service client.

La méthode "getClient" renvoie un objet "client" avec des informations pré-définies. La méthode "searchClients" renvoie un tableau d'objets "clients" avec des informations pré-définies. La méthode "createClient" crée un nouvel objet "client" à partir des informations passées en paramètre.

Enfin, le serveur est créé et lié à un port spécifique. Une fois le serveur lancé, la console affiche un message confirmant que le serveur est en cours d'exécution sur le port spécifié.

Pour utiliser ce service client, il faut créer un client gRPC qui invoque les méthodes "GetClient", "SearchClients" et "CreateClient" et envoie les paramètres nécessaires.
# ServiceMicroServices 
Ce code met en œuvre un microservice de service en utilisant gRPC pour la communication et MongoDB comme base de données. Voici une description de son utilisation :

Tout d'abord, les dépendances nécessaires sont importées, telles que "@grpc/grpc-js" pour gRPC, "@grpc/proto-loader" pour charger la définition du protocole, et "mongodb" pour la gestion de la base de données MongoDB.

La définition du protocole gRPC est chargée à partir du fichier "service.proto" à l'aide de "protoLoader". Cette définition est utilisée pour générer les services gRPC correspondants.

La connexion à la base de données MongoDB est établie en utilisant les informations de connexion fournies (url et dbName).

La fonction connect est définie comme une fonction asynchrone qui crée une nouvelle instance de MongoClient, se connecte à la base de données et retourne l'objet db (base de données) pour les opérations ultérieures.

Un objet serviceService est défini, qui contient les méthodes gRPC pour la manipulation des services. Les méthodes telles que getService, searchServices, createService, updateService et deleteService sont définies pour effectuer des opérations spécifiques sur la collection "services" de la base de données.

Un serveur gRPC est créé à l'aide de la classe grpc.Server(). Les services définis dans serviceService sont ajoutés au serveur en utilisant la méthode addService, en spécifiant la définition du service et l'objet contenant les méthodes.

Ce code permet de créer un microservice gRPC pour la gestion des services en utilisant MongoDB comme base de données. Il fournit des opérations pour récupérer, créer, mettre à jour et supprimer des services à partir de la base de données MongoDB en utilisant le protocole de communication gRPC.

# ApiGateway

Ce code est un exemple d'une API Gateway qui se connecte à deux services différents (client et service) via gRPC pour exposer une API GraphQL. Voici une description des étapes clés du code:

- Le code commence par l'importation des différents modules nécessaires tels qu'Express, ApolloServer, Body-parser, CORS, gRPC, et protoLoader.
- Il charge les définitions de protocole client.proto et service.proto en utilisant protoLoader. Il crée ensuite des clients gRPC pour les deux services en utilisant les définitions de protocole chargées. Les clients sont utilisés plus tard pour appeler les méthodes exposées par les deux services.
- Il définit le schéma GraphQL pour l'API en utilisant typeDefs et les résolveurs en utilisant resolvers.
- Il crée un objet ApolloServer avec le schéma et les résolveurs définis.
- Il définit les endpoints pour l'API REST exposée par l'API Gateway en utilisant Express. Il utilise les clients gRPC créés précédemment pour appeler les méthodes exposées par les deux services et récupérer les données.
- Il démarre le serveur ApolloServer et l'attache à l'application Express.
- Il définit le port sur lequel l'API Gateway doit écouter les demandes entrantes et démarre le serveur en utilisant app.listen().

L'API Gateway expose donc une API REST pour les clients qui peut être consommée pour obtenir des informations sur les clients et les services. La Gateway utilise des clients gRPC pour communiquer avec les services sous-jacents et expose une API GraphQL pour la consommation des clients.
# Utilisation des URI
GET /clients : Cette URI permet de récupérer tous les clients. Lorsque cette requête est effectuée, le serveur se connecte à la base de données, récupère tous les documents de la collection "clients" et les renvoie en tant que réponse JSON.

POST /client : Cette URI permet d'ajouter un nouveau client. Lorsque cette requête est effectuée, les données du client sont extraites du corps de la requête (pro, nom_prenom, num_tel, n_cin, email, adresse, gouvernement, code_postal, note). Ensuite, le serveur se connecte à la base de données, insère le nouveau client dans la collection "clients" et renvoie les données du client ajouté en tant que réponse JSON.

GET /client/:id : Cette URI permet de récupérer un client spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du client est extrait des paramètres de la requête. Le serveur se connecte à la base de données, recherche le client correspondant à cet ID dans la collection "clients" et renvoie le client trouvé en tant que réponse JSON.

PUT /client/:id : Cette URI permet de mettre à jour un client spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du client est extrait des paramètres de la requête, et les nouvelles données du client (pro, nom_prenom, num_tel, n_cin, email, adresse, gouvernement, code_postal, note) sont extraites du corps de la requête. Le serveur se connecte à la base de données, met à jour le client correspondant à cet ID dans la collection "clients" avec les nouvelles données et renvoie les nouvelles données du client en tant que réponse JSON.

DELETE /client/:id : Cette URI permet de supprimer un client spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du client est extrait des paramètres de la requête. Le serveur se connecte à la base de données, supprime le client correspondant à cet ID de la collection "clients" et renvoie un message JSON indiquant que le client a été supprimé avec succès.

GET /services : Cette URI permet de récupérer tous les services. Lorsque cette requête est effectuée, le serveur se connecte à la base de données, récupère tous les documents de la collection "services" et les renvoie en tant que réponse JSON.

GET /service/:id : Cette URI permet de récupérer un service spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du service est extrait des paramètres de la requête. Le serveur se connecte à la base de données, recherche le service correspondant à cet ID dans la collection "services" et renvoie le service trouvé en tant que réponse JSON.

POST /service : Cette URI permet d'ajouter un nouveau service. Lorsque cette requête est effectuée, les données du service sont extraites du corps de la requête (description, designation, prix_Achat, prix_Vente, tva, quantity, remise, type). Ensuite, le serveur se connecte à la base de données, insère le nouveau service dans la collection "services" et renvoie les données du service ajouté en tant que réponse JSON.

DELETE /service/:id : Cette URI permet de supprimer un service spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du service est extrait des paramètres de la requête. Le serveur se connecte à la base de données, supprime le service correspondant à cet ID de la collection "services" et renvoie un message JSON indiquant que le service a été supprimé avec succès.

PUT /service/:id : Cette URI permet de mettre à jour un service spécifique en fonction de son ID. Lorsque cette requête est effectuée, l'ID du service est extrait des paramètres de la requête, et les nouvelles données du service (description, designation, prix_Achat, prix_Vente, tva, quantity, remise, type) sont extraites du corps de la requête. Le serveur se connecte à la base de données, met à jour le service correspondant à cet ID dans la collection "services" avec les nouvelles données et renvoie les nouvelles données du service en tant que réponse JSON.
