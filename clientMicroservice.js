const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { MongoClient, ObjectID } = require("mongodb");
const clientProtoPath = "client.proto";
const clientProtoDefinition = protoLoader.loadSync(clientProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const clientProto = grpc.loadPackageDefinition(clientProtoDefinition).client;
// MongoDB connection
const url = "mongodb+srv://ecommerce:ecommerce@cluster0.5hfgv.mongodb.net/";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}
const clientService = {
  getClient: async (call, callback) => {
    const db = await connect();
    const id = call.request.client_id;
    const clientt = await db
      .collection("clients")
      .findOne({ _id: ObjectID(id) });
    callback(null, { client: clientt });
  },
  searchClients: async (call, callback) => {
    const db = await connect();
    const clients = await db.collection("clients").find().toArray();
    callback(null, { clients: clients });
  },
  createClient: async (call, callback) => {
    const db = await connect();
    const {
      client_id,
      pro,
      nom_prenom,
      num_tel,
      n_cin,
      email,
      adresse,
      gouvernement,
      code_postal,
      note,
    } = call.request;
    const clientt = {
      _id: ObjectID(client_id),
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
    await db.collection("clients").insertOne(clientt);
    callback(null, { clientt });
  },
  updateClient: async (call, callback) => {
    const db = await connect();
    const {
      client_id,
      pro,
      nom_prenom,
      num_tel,
      n_cin,
      email,
      adresse,
      gouvernement,
      code_postal,
      note,
    } = call.request;
    const updatedClient = {
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
    await db
      .collection("clients")
      .updateOne({ _id: ObjectID(client_id) }, { $set: updatedClient });
    const clientt = await db
      .collection("clients")
      .findOne({ _id: ObjectID(client_id) });
    callback(null, { client: clientt });
  },
  deleteClient: async (call, callback) => {
    const db = await connect();
    const client_id = call.request.client_id;
    const result = await db
      .collection("clients")
      .deleteOne({ _id: ObjectID(client_id) });
    const success = result.deletedCount > 0;
    callback(null, { success });
  },
};

const server = new grpc.Server();
server.addService(clientProto.ClientService.service, clientService);
const port = 50051;
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
console.log(`Client microservice running on port ${port}`);
