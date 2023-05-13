const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const serviceProtoPath = "service.proto";
const serviceProtoDefinition = protoLoader.loadSync(serviceProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const serviceProto = grpc.loadPackageDefinition(serviceProtoDefinition).service;

const serviceService = {
  getService: (call, callback) => {
    const service = [
      {
        id: call.request.service_id,
        description: "This is an example of Service",
        designation: "Service for test ",
        prix_Achat: 3200,
        prix_Vente: 4000,
        tva: 19,
        quantity: 20,
        remise: 1,
        type: "Service",
      },
      {
        id: call.request.service_id,
        description: "Developpement Web",
        designation: "Service DEV_WEB",
        prix_Achat: 5000,
        prix_Vente: 5000,
        tva: 19,
        quantity: 1,
        remise: 1,
        type: "Service",
      },
      {
        id: call.request.service_id,
        description: "Dollar",
        designation: "Service Marketing",
        prix_Achat: 3200,
        prix_Vente: 5000,
        tva: 19,
        quantity: 200,
        remise: 1,
        type: "Article",
      },
    ];
    callback(null, { service });
  },
  searchServices: (call, callback) => {
    const { query } = call.request;

    const services = [
      {
        id: "1",
        description: "This is an example of Service",
        designation: "Service for test ",
        prix_Achat: 3200,
        prix_Vente: 4000,
        tva: 19,
        quantity: 20,
        remise: 1,
        type: "Service",
      },
      {
        id: "2",
        description: "Developpement Web",
        designation: "Service DEV_WEB",
        prix_Achat: 5000,
        prix_Vente: 5000,
        tva: 19,
        quantity: 1,
        remise: 1,
        type: "Service",
      },
      {
        id: "3",
        description: "Dollar",
        designation: "Service Marketing",
        prix_Achat: 3200,
        prix_Vente: 5000,
        tva: 19,
        quantity: 200,
        remise: 1,
        type: "Article",
      },
    ];
    callback(null, { services });
  },
};

const server = new grpc.Server();
server.addService(serviceProto.ServiceService.service, serviceService);
const port = 50052;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }

    console.log(`Server is running on port ${port}`);
    server.start();
  }
);
console.log(`Service microservice running on port ${port}`);
