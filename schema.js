const { gql } = require("@apollo/server");

const typeDefs = `#graphql
  type Client {
    pro: Boolean!
    nom_prenom: String!
    num_tel: String
    n_cin: String!
    email: String!
    adresse: String!
    gouvernement: String!
    code_postal: String!
    notes: String
  }

  type Service {
    description: String!
    designation:String!
    prix_Achat:Float!
    prix_Vente:Float!
    tva:Int!
    quantity:Int!
    remise:Int!
    type:String!
  }

  type Query {
    client(id: String!): Client
    clients: [Client]
    service(id: String!): Service
    services: [Service]
  }
  type Mutation {
    createClient(pro: Boolean!
      nom_prenom: String!
      num_tel: String!
      n_cin: String!
      email: String!
      adresse: String!
      gouvernement: String!
      code_postal: String!
      notes: String): Client
      
      createService(description: String!
    designation:String!
    prix_Achat:Float!
    prix_Vente:Float!
    tva:Int!
    quantity:Int!
    remise:Int!
    type:String!): Service
  }
`;

module.exports = typeDefs;
