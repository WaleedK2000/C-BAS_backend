const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const User = require("./models/User");

const userMangementRoutes = require("./routes/userManagement");
const nodesRouter = require("./routes/nodeManagement");
const exploits = require("./routes/exploits");
const data = require("./routes/data");

const msRestAzure = require("ms-rest-azure");
const { SecretClient } = require("@azure/keyvault-secrets");

const { DefaultAzureCredential } = require("@azure/identity");

const client = new SecretClient(url, credential);

const credential = new DefaultAzureCredential();

async function getKeyVaultCredentials() {
  return msRestAzure.loginWithAppServiceMSI({
    resource: "https://vault.azure.net",
  });
}

async function getSecretFromKeyVault(secretName, keyVaultName) {
  const credentials = await getKeyVaultCredentials();
  const secretClient = new SecretClient(
    `https://${keyVaultName}.vault.azure.net`,
    credentials
  );

  const secret = await secretClient.getSecret(secretName);
  return secret.value;
}

const secretName = "mongodb-password";
const keyVaultName = "cbas-secrets";

const pass = getSecretFromKeyVault(secretName, keyVaultName)
  .then((secretValue) => {
    console.log(`Secret value retrieved from Key Vault: ${secretValue}`);
    // Use the secret value in your MongoDB connection string
  })
  .catch((error) => {
    console.error("Error retrieving secret from Key Vault:", error.message);
  });

// const signupRoute = rq

app.use(express.json());
app.use(cors());

app.use("/api/users", userMangementRoutes);
app.use("/api/nodes", nodesRouter);
app.use("/api/exploits", exploits);
app.use("/api/data", data);

try {
  const username = "waleed";
  const password = pass;
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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.listen(3000, () => {
//   //   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   console.log("Node Running on port 3000");
// });
