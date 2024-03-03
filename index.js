const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const User = require("./models/User");

const userMangementRoutes = require("./routes/userManagement");
const nodesRouter = require("./routes/nodeManagement");
const exploits = require("./routes/exploits");
const data = require("./routes/data");

require("dotenv").config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env.KEYVAULT_URI, credential);

app.get("/secret", (req, res) => {
  client
    .getSecret("mongodb-password")
    .then((data) => {
      res.send(data.value);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// const signupRoute = rq

app.use(express.json());
app.use(cors());

app.use("/api/users", userMangementRoutes);
app.use("/api/nodes", nodesRouter);
app.use("/api/exploits", exploits);
app.use("/api/data", data);

try {
  async function connectToMongoDB() {
    try {
      let password = await client.getSecret("mongodb-password");

      const username = "waleed";

      const connectionString = `mongodb+srv://${encodeURIComponent(
        username
      )}:${encodeURIComponent(
        password.value
      )}@cbas-backend.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  connectToMongoDB();

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Server listening on port ${port}`));

  const username = "waleed";

  const connectionString = `mongodb+srv://${encodeURIComponent(
    username
  )}:${encodeURIComponent(
    password
  )}@cbas-backend.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
}

// app.listen(3000, () => {
//   //   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   console.log("Node Running on port 3000");
// });
