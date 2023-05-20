const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { MongoClient, ObjectID } = require("mongodb");
const serviceProtoPath = "service.proto";
const serviceProtoDefinition = protoLoader.loadSync(serviceProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const serviceProto = grpc.loadPackageDefinition(serviceProtoDefinition).service;
// MongoDB connection
const url = "mongodb+srv://ecommerce:ecommerce@cluster0.5hfgv.mongodb.net/";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}
const serviceService = {
  getService: async (call, callback) => {
    const db = await connect();
    const id = call.request.client_id;
    const service = await db
      .collection("services")
      .findOne({ _id: ObjectID(id) });
    callback(null, { service: service });
  },
  searchServices: async (call, callback) => {
    const db = await connect();
    const services = await db.collection("services").find().toArray();
    callback(null, { services: services });
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

  updateService: async (call, callback) => {
    const db = await connect();
    const {
      description,
      designation,
      prix_Achat,
      prix_Vente,
      tva,
      quantity,
      remise,
      type,
    } = call.request;
    const updatedService = {
      description,
      designation,
      prix_Achat,
      prix_Vente,
      tva,
      quantity,
      remise,
      type,
    };
    await db
      .collection("services")
      .updateOne({ _id: ObjectID(service_id) }, { $set: updatedService });
    const service = await db
      .collection("services")
      .findOne({ _id: ObjectID(service_id) });
    callback(null, { service: service });
  },

  deleteService: async (call, callback) => {
    const db = await connect();
    const service_id = call.request.service_id;
    const result = await db
      .collection("services")
      .deleteOne({ _id: ObjectID(service_id) });
    const success = result.deletedCount > 0;
    callback(null, { success });
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
