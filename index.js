const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const User = require("./models/User");

const userMangementRoutes = require("./routes/userManagement");
const nodesRouter = require("./routes/nodeManagement");
const exploits = require("./routes/exploits");
const data = require("./routes/data");

// const signupRoute = rq

app.use(express.json());
app.use(cors());

app.use("/api/users", userMangementRoutes);
app.use("/api/nodes", nodesRouter);
app.use("/api/exploits", exploits);
app.use("/api/data", data);

mongoose.connect("mongodb://localhost:27017/cbas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.listen(3000, () => {
//   //   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   const MyModel = mongoose.model("Test", new Schema({ name: String }));

//   console.log("Node Running on port 3000");
// });
