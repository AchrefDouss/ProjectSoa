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
