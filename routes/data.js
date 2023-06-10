const express = require("express");
const router = express.Router();

// const { createScriptLog } = require("../services/logService/createLogService");

const {
  getExecutedScripts,
  getSucessfulScripts,
  getSucessfulScriptsBreakdownByNodeId,
  getLineChartData,
} = require("../services/logService/fetchLogScript");

router.get("/", async (req, res) => {
  res.status(200).send();
});

router.get("/get_data_24hr", async (req, res) => {
  const executedScripts = await getSucessfulScripts("24h");
  res.status(200).send(executedScripts);
});

router.get("/get_data_24hr_by_nodeid", async (req, res) => {
  const executedScripts = await getSucessfulScriptsBreakdownByNodeId("24h");
  res.status(200).send(executedScripts);
});

module.exports = router;
