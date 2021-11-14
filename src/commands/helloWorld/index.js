const vscode = require("vscode");

exports.helloWorldCommand = vscode.commands.registerCommand(
  "wechat-page.helloWorld",
  function () {
    vscode.window.showInformationMessage("Hello World from wechat-page6!");
  }
);
