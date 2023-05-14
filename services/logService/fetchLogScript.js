const { scriptLogModel } = require("../../models/logs/");

const Node = require("../../models/Node");

const getTimeFrame = (timeframe) => {
  let startDate;

  switch (timeframe) {
    case "24h":
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case "1w":
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1m":
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      throw new Error("Invalid timeframe");
  }

  return startDate;
};

async function getExecutedScripts(timeframe) {
  let startDate = getTimeFrame(timeframe);

  const executedScripts = await scriptLogModel.find({
    timestamp: { $gte: startDate },
  });

  return executedScripts;
}

async function getSucessfulScripts(timeframe) {
  let startDate = getTimeFrame(timeframe);

  const executedScripts = await scriptLogModel.find({
    timestamp: { $gte: startDate },
  });

  const successfulScripts = executedScripts.filter((script) => script.success);
  const failedScripts = executedScripts.filter((script) => !script.success);

  return { sucessful: successfulScripts.length, failed: failedScripts.length };
}

async function getSucessfulScriptsBreakdownByNodeId(timeframe) {
  let startDate = getTimeFrame(timeframe);

  const executedScripts = await scriptLogModel.find({
    timestamp: { $gte: startDate },
  });

  const breakdownByNodeId = executedScripts.reduce(async (acc, script) => {
    const node = await Node.findById(script.nodeId);
    const nodeName = node.name;

    if (!acc[script.nodeId]) {
      acc[script.nodeId] = {
        successfulCount: 0,
        failedCount: 0,
        node_name: nodeName,
      };
    }
    if (script.success) {
      acc[script.nodeId].successfulCount++;
    } else {
      acc[script.nodeId].failedCount++;
    }
    return acc;
  }, {});

  return breakdownByNodeId;
}

async function getLineChartData(timeframe) {
  let startDate = getTimeFrame(timeframe);

  const executedScripts = await scriptLogModel.find({
    timestamp: { $gte: startDate },
  });

  const data = executedScripts.reduce((acc, script) => {
    const date = script.timestamp.toISOString().split("T")[0];
    const item = acc.find(
      (item) => item.nodeId === script.nodeId && item.date === date
    );
    if (item) {
      if (script.success) {
        item.successfulCount++;
      } else {
        item.failedCount++;
      }
    } else {
      acc.push({
        nodeId: script.nodeId,
        date,
        successfulCount: script.success ? 1 : 0,
        failedCount: script.success ? 0 : 1,
      });
    }
    return acc;
  }, []);

  return data;
}

module.exports = {
  getExecutedScripts,
  getSucessfulScripts,
  getSucessfulScriptsBreakdownByNodeId,
  getLineChartData,
};
