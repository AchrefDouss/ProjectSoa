const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const clientProtoPath = "client.proto";
const clientProtoDefinition = protoLoader.loadSync(clientProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const clientProto = grpc.loadPackageDefinition(clientProtoDefinition).client;

const clientService = {
  getClient: (call, callback) => {
    const client = {
      id: call.request.client_id,
      pro: true,
      nom_prenom: "achref douss",
      num_tel: "93738819",
      n_cin: "14223233",
      email: "achrefdouss@gmail.com",
      adresse: "Moknine",
      gouvernement: "Monastir",
      code_postal: "5050",
      note: "This is pro client",
    };
    callback(null, { client });
  },
  searchClients: (call, callback) => {
    const { query } = call.request;

    const clients = [
      {
        id: "1",
        pro: true,
        nom_prenom: "achref douss",
        num_tel: "93738819",
        n_cin: "14223233",
        email: "achrefdouss@gmail.com",
        adresse: "Moknine",
        gouvernement: "Monastir",
        code_postal: "5050",
        note: "This is pro client",
      },
      {
        id: "2",
        pro: false,
        nom_prenom: "John Doe",
        num_tel: "2424444",
        n_cin: "2523232",
        email: "johnDoe@gmail.com",
        adresse: "Paris",
        gouvernement: "Paris",
        code_postal: "412-PA",
        note: "This is Normal client",
      },
      {
        id: "3",
        pro: true,
        nom_prenom: "Test Client",
        num_tel: "50656985",
        n_cin: "14003005",
        email: "ClientTest@gmail.com",
        adresse: "Rue yaser Arafet,Sahloul",
        gouvernement: "Sahloul",
        code_postal: "4001",
        note: "This is a Pro client",
      },
    ];
    callback(null, { clients });
  },
  createClient: (call, callback) => {
    const { query } = call.request;
    const client = {
      id: call.request.client_id,
      nom_prenom: call.request.nom_prenom,
      num_tel: call.request.num_tel,
      n_cin: call.request.n_cin,
      email: call.request.email,
      adresse: call.request.adresse,
      gouvernement: call.request.gouvernement,
      code_postal: call.request.code_postal,
      note: call.request.note,
    };
    callback(null, { client });
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
