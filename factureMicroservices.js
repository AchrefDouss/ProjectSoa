const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { MongoClient, ObjectID } = require("mongodb");
const factureProtoPath = "facture.proto";
const factureProtoDefinition = protoLoader.loadSync(factureProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const factureProto = grpc.loadPackageDefinition(factureProtoDefinition).facture;
// MongoDB connection
const url = "mongodb+srv://ecommerce:ecommerce@cluster0.5hfgv.mongodb.net/";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}
const factureService = {
  getFacture: async (call, callback) => {
    const db = await connect();
    const id = call.request.factureid;
    const facture = await db
      .collection("factures")
      .findOne({ _id: ObjectID(id) });
    callback(null, { facture: facture });
  },
  searchFactures: async (call, callback) => {
    const db = await connect();
    const factures = await db.collection("factures").find().toArray();
    callback(null, { factures: factures });
  },
  createFacture: async (call, callback) => {
    const db = await connect();
    const { client, ref, service, quantity } = call.request;
    const facture = {
      _id: ObjectID(client_id),
      client,
      ref,
      service,
      quantity,
    };
    await db.collection("factures").insertOne(facture);
    callback(null, { facture });
  },
  updateFacture: async (call, callback) => {
    const db = await connect();
    const { facture_id, client, ref, service, quantity } = call.request;
    const updatedFacture = {
      client,
      ref,
      service,
      quantity,
    };
    await db
      .collection("factures")
      .updateOne({ _id: ObjectID(facture_id) }, { $set: updatedFacture });
    const facture = await db
      .collection("factures")
      .findOne({ _id: ObjectID(facture_id) });
    callback(null, { facture: facture });
  },
  deleteFacture: async (call, callback) => {
    const db = await connect();
    const facture_id = call.request.facture_id;
    const result = await db
      .collection("factures")
      .deleteOne({ _id: ObjectID(facture_id) });
    const success = result.deletedCount > 0;
    callback(null, { success });
  },
};

const server = new grpc.Server();
server.addService(factureProto.FactureService.service, factureService);
const port = 50053;
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
console.log(`Facture microservice running on port ${port}`);
