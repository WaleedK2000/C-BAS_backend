const mongoose = require("mongoose");
const { Schema } = mongoose;

const nodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    portNumber: {
      type: Number,
      default: 7700,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "63f3af355f0bf9a700e77c61",
    },
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
