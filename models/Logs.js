const mongoose = require("mongoose");
const { Schema } = mongoose;

// base log schema
const logSchema = new Schema({
  timestamp: Date,
  path: String,
  success: Boolean,
  logType: String,
});

// script log model
const scriptLogModel = mongoose.model(
  "ScriptLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    scriptName: String,
    nodeId: String,
  })
);

// login log model
const loginLogModel = mongoose.model(
  "LoginLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    username: String,
  })
);

// browser event log model
const browserEventLogModel = mongoose.model(
  "BrowserEventLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    eventType: String,
  })
);

// module.exports = {
//   scriptLogModel,
//   loginLogModel,
//   browserEventLogModel,
// };

module.exports = { scriptLogModel, loginLogModel, browserEventLogModel };
