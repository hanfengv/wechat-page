const vscode = require("vscode");
const File = require("./file");

let createTplCommand = vscode.commands.registerCommand(
  "wechat-page.createTpl",
  function (context) {
    File.createTemplateMain({ context });
  }
);

module.exports = { createTplCommand };
