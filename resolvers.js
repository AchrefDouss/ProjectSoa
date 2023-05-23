const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { MongoClient, ObjectId } = require("mongodb");
const clientProtoPath = "client.proto";
const serviceProtoPath = "service.proto";
const clientProtoDefinition = protoLoader.loadSync(clientProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const serviceProtoDefinition = protoLoader.loadSync(serviceProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const clientProto = grpc.loadPackageDefinition(clientProtoDefinition).client;
const serviceProto = grpc.loadPackageDefinition(serviceProtoDefinition).service;

const url = "mongodb+srv://ecommerce:ecommerce@cluster0.5hfgv.mongodb.net/";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}

const clientClients = new clientProto.ClientService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const clientServices = new serviceProto.ServiceService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

const resolvers = {
  Query: {
    client: (_, { id }) => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("clients").findOne(
          { _id: ObjectId(id) },
          (err, client) => {
            if (err) {
              reject(err);
            } else {
              resolve(client);
            }
          }
        );
      });
    },
    clients: () => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("clients")
          .find()
          .toArray((err, clients) => {
            if (err) {
              reject(err);
            } else {
              resolve(clients);
            }
          });
      });
    },
    service: (_, { id }) => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("services").findOne(
          { _id: ObjectId(id) },
          (err, service) => {
            if (err) {
              reject(err);
            } else {
              resolve(service);
            }
          }
        );
      });
    },
    services: () => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("services")
          .find()
          .toArray((err, services) => {
            if (err) {
              reject(err);
            } else {
              resolve(services);
            }
          });
      });
    },
  },
  Mutation: {
    createClient: (
      _,
      {
        pro,
        nom_prenom,
        num_tel,
        n_cin,
        email,
        adresse,
        gouvernement,
        code_postal,
        note,
      }
    ) => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("clients").insertOne(
          {
            pro,
            nom_prenom,
            num_tel,
            n_cin,
            email,
            adresse,
            gouvernement,
            code_postal,
            note,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                pro,
                nom_prenom,
                num_tel,
                n_cin,
                email,
                adresse,
                gouvernement,
                code_postal,
                note,
              });
            }
          }
        );
      });
    },
    createService: (
      _,
      {
        description,
        designation,
        prix_Achat,
        prix_Vente,
        tva,
        quantity,
        remise,
        type,
      }
    ) => {
      return new Promise(async (resolve, reject) => {
        const db = await connect();
        db.collection("services").insertOne(
          {
            description,
            designation,
            prix_Achat,
            prix_Vente,
            tva,
            quantity,
            remise,
            type,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                description,
                designation,
                prix_Achat,
                prix_Vente,
                tva,
                quantity,
                remise,
                type,
              });
            }
          }
        );
      });
    },
    updateClient: async (
      {
        id,
        pro,
        nom_prenom,
        num_tel,
        n_cin,
        email,
        adresse,
        gouvernement,
        code_postal,
        note,
      },
      context
    ) => {
      const db = await connect();
      const client = {
        pro,
        nom_prenom,
        num_tel,
        n_cin,
        email,
        adresse,
        gouvernement,
        code_postal,
        note,
      };

      const result = await db
        .collection("clients")
        .updateOne({ _id: ObjectId(id) }, { $set: client });

      return client;
    },
    deleteClient: async (parent, { id }, context) => {
      const db = await connect();
      const result = await db
        .collection("clients")
        .deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0; // Return true if deletion was successful
    },
    deleteService: async (parent, { id }, context) => {
      const db = await connect();
      const result = await db
        .collection("clients")
        .deleteOne({ _id: ObjectId(id) });
      return result.deletedCount > 0; // Return true if deletion was successful
    },
    updateService: async (
      {
        id,
        description,
        designation,
        prix_Achat,
        prix_Vente,
        tva,
        quantity,
        remise,
        type,
      },
      context
    ) => {
      const db = await connect();
      const service = {
        description,
        designation,
        prix_Achat,
        prix_Vente,
        tva,
        quantity,
        remise,
        type,
      };

      const result = await db
        .collection("services")
        .updateOne({ _id: ObjectId(id) }, { $set: service });

      return service;
    },
  },
};

module.exports = resolvers;
