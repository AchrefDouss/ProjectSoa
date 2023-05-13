const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const clientProtoPath = "client.proto";
const serviceProtoPath = "service.proto";

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

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
});

app.get("/clients", (req, res) => {
  clientClients.searchClients({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.clients);
    }
  });
});

app.post("/client", (req, res) => {
  const {
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
  } = req.body;
  clientClients.createClient(
    {
      client_id: id,
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
        res.status(500).send(err);
      } else {
        res.json(response.client);
      }
    }
  );
});

app.get("/client/:id", (req, res) => {
  const id = req.params.id;
  clientClients.getClient({ clientId: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.client);
    }
  });
});

app.get("/services", (req, res) => {
  clientServices.searchServices({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.services);
    }
  });
});

app.get("/service/:id", (req, res) => {
  const id = req.params.id;
  clientServices.getService({ serviceId: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.service);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
