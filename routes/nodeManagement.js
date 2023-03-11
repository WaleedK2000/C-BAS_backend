const express = require("express");
const router = express.Router();
const Node = require("../models/Node");

// Create a node
router.post("/", async (req, res) => {
  try {
    const node = new Node({
      name: req.body.name,
      ipAddress: req.body.ipAddress,
      portNumber: req.body.portNumber,
    });
    const savedNode = await node.save();
    res.status(201).json(savedNode);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get all nodes
router.get("/", async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a node by id
router.put("/api/nodes/:id", async (req, res) => {
  try {
    const node = await Node.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!node) {
      return res.status(404).send({ error: "Node not found" });
    }
    res.send(node);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
