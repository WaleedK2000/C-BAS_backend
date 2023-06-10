// logService.js
const {
  scriptLogModel,
  loginLogModel,
  browserEventLogModel,
} = require("../../models/logs/");

function createScriptLog(path, success, scriptName, nodeId) {
  const scriptLog = new scriptLogModel({
    timestamp: Date.now(),
    path,
    success,
    logType: "script",
    scriptName,
    nodeId,
  });
  return scriptLog.save();
}

function createLoginLog(path, success, username) {
  const loginLog = new loginLogModel({
    timestamp: Date.now(),
    path,
    success,
    logType: "login",
    username,
  });
  return loginLog.save();
}

function createBrowserEventLog(path, success, eventType) {
  const browserEventLog = new browserEventLogModel({
    timestamp: Date.now(),
    path,
    success,
    logType: "browser-event",
    eventType,
  });
  return browserEventLog.save();
}

module.exports = {
  createScriptLog,
  createLoginLog,
  createBrowserEventLog,
};
