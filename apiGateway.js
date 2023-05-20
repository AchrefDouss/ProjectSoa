const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const clientProtoPath = "client.proto";
const serviceProtoPath = "service.proto";
const { MongoClient, ObjectId } = require("mongodb");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const app = express();
app.use(bodyParser.json());

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

// MongoDB connection
const url = "mongodb+srv://ecommerce:ecommerce@cluster0.5hfgv.mongodb.net/";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
});

app.get("/clients", async (req, res) => {
  const db = await connect();
  const clients = await db.collection("clients").find().toArray();
  res.json(clients);
});

app.post("/client", async (req, res) => {
  const {
    pro,
    nom_prenom,
    num_tel,
    n_cin,
    email,
    adresse,
    gouvernement,
    code_postal,
    note,
  } = req.body;
  const db = await connect();
  const clientt = {
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
  res.json(clientt);
});

app.get("/client/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connect();
  const client = await db
    .collection("clients")
    .findOne({ _id: new ObjectId(id) });
  res.json(client);
});
app.put("/client/:id", async (req, res) => {
  const id = req.params.id;
  const {
    pro,
    nom_prenom,
    num_tel,
    n_cin,
    email,
    adresse,
    gouvernement,
    code_postal,
    note,
  } = req.body;
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
    .updateOne({ _id: new ObjectId(id) }, { $set: client });
  res.json(client);
});
app.delete("/client/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connect();
  await db.collection("clients").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Client deleted successfully" });
});

app.get("/services", async (req, res) => {
  const db = await connect();
  const services = await db.collection("services").find().toArray();
  res.json(services);
});

app.get("/service/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connect();
  const service = await db
    .collection("services")
    .findOne({ _id: new ObjectId(id) });
  res.json(service);
});

app.post("/service", async (req, res) => {
  const {
    description,
    designation,
    prix_Achat,
    prix_Vente,
    tva,
    quantity,
    remise,
    type,
  } = req.body;
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
  await db.collection("services").insertOne(service);
  res.json(service);
});
app.delete("/service/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connect();
  await db.collection("services").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Service deleted successfully" });
});

app.put("/service/:id", async (req, res) => {
  const id = req.params.id;
  const {
    description,
    designation,
    prix_Achat,
    prix_Vente,
    tva,
    quantity,
    remise,
    type,
  } = req.body;
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
    .updateOne({ _id: new ObjectId(id) }, { $set: service });
  res.json(service);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
