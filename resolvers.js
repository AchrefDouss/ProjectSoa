const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

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
      return new Promise((resolve, reject) => {
        clientClients.getClient({ clientId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.client);
          }
        });
      });
    },
    clients: () => {
      return new Promise((resolve, reject) => {
        clientClients.searchClients({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.clients);
          }
        });
      });
    },
    service: (_, { id }) => {
      return new Promise((resolve, reject) => {
        clientServices.getService({ serviceId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.service);
          }
        });
      });
    },
    services: () => {
      return new Promise((resolve, reject) => {
        clientServices.searchServices({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.services);
          }
        });
      });
    },
  },
  Mutation: {
    createClient: (
      _,
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
      }
    ) => {
      return new Promise((resolve, reject) => {
        clientClients.createClient(
          {
            movie_id: id,
            pro: pro,
            nom_prenom: nom_prenom,
            num_tel: num_tel,
            n_cin: n_cin,
            email: email,
            adresse: adresse,
            gouvernement: gouvernement,
            code_postal: code_postal,
            note: note,
          },
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response.client);
            }
          }
        );
      });
    },
  },
};

module.exports = resolvers;
