/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const { helloWorldCommand } = require("./src/commands/helloWorld");
  const { wePageCommand } = require("./src/commands/wePage");
  const { createTplCommand } = require("./src/commands/template");
  context.subscriptions.push(
    helloWorldCommand,
    wePageCommand,
    createTplCommand
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
