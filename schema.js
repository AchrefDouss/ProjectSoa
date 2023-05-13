const { gql } = require("@apollo/server");

const typeDefs = `#graphql
  type Client {
    id: String!
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
    id: String!
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
    createClient(id: String!,  pro: Boolean!
      nom_prenom: String!
      num_tel: String!
      n_cin: String!
      email: String!
      adresse: String!
      gouvernement: String!
      code_postal: String!
      notes: String): Client
  }
`;

module.exports = typeDefs;
