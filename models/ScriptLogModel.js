const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema({
  timestamp: Date,
  path: String,
  success: Boolean,
  logType: String,
});

const ScriptLogModel = mongoose.model(
  "ScriptLog",
  new Schema({
    ...logSchema.obj, // inherit properties from base schema
    scriptName: String,
    nodeId: String,
  })
);

module.exports = ScriptLogModel;
