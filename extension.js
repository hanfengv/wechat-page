// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window } from "vscode";
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = commands.registerCommand(
    "wechat-page.helloWorld",
    function () {
      window.showInformationMessage("Hello World from wechat-page!");
    }
  );

  let wePage = commands.registerCommand("wechat-page.wePage", function () {
    window.showInformationMessage("Hello World from wePage!");
  });
  context.subscriptions.push(disposable, wePage);
}

function deactivate() {}

export default {
  activate,
  deactivate,
};
