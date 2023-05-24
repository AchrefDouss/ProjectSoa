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
  type Facture{
    client :String!
    ref: String!
    service:[String]!
    quantity:Int!
  }

  type Query {
    client(id: String!): Client
    clients: [Client]
    service(id: String!): Service
    services: [Service]
    facture(id: String!): Facture
    factures: [Facture]
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
    updateClient(id:ID! pro: Boolean!
                    nom_prenom: String!
                    num_tel: String!
                    n_cin: String!
                    email: String!
                    adresse: String!
                    gouvernement: String!
                    code_postal: String!
                    notes: String): Client
    deleteClient(id: ID!): Boolean
    updateService(id:ID! description: String!
                    designation:String!
                    prix_Achat:Float!
                    prix_Vente:Float!
                    tva:Int!
                    quantity:Int!
                    remise:Int!
                    type:String!): Service
    deleteService(id: ID!): Boolean
    
    createFacture(pro: Boolean!
                    client: String!
                    ref: String!
                    service: [String]!
                    quantity: Int!
                   ): Facture

    updateFacture(id:ID! 
                    client: String!
                    ref: String!
                   service: [String]!
                    quantity: Int!
                    ): Facture
    deleteFacture(id: ID!): Boolean

  }
`;

module.exports = typeDefs;
