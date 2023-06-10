const express = require("express");
const router = express.Router();
const Node = require("../models/Node");
const axios = require("axios");

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
    const nodesWithStatus = await Promise.all(
      nodes.map(async (node) => {
        const ip = node.ipAddress + ":" + node.portNumber;
        console.log(ip);
        const url = `${ip}/api/ping/`;
        console.log(url);
        let connectionStatus;

        await axios
          .get(url)
          .then((res) => {
            connectionStatus = 200;
          })
          .catch((res) => {
            connectionStatus = 404;
          });
        // connectionStatus = "online";

        return { ...node.toObject(), connectionStatus };
      })
    );
    res.json(nodesWithStatus);
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

// Get status

router.get("/api/nodes/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const node = await Node.findById(req.params.id);
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
