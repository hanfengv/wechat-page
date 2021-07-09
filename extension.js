const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const getCurFilePath = async () => {
    return vscode.window.activeTextEditor.document.fileName;
  };
  const showPages = async () => {
    // let editor = vscode.window.activeTextEditor;
    // const curFileFsPath = editor.document.uri.fsPath;
    const curFilePath = getCurFilePath();
    const clipboardText = await vscode.env.clipboard.readText();
    console.log("🚀 :: env:: ", { clipboardText, curFilePath });
    const result = await vscode.window.showQuickPick(
      ["a.wxss", "zwei", "drei"],
      {
        placeHolder: "请选择要打开的文件",
      }
    );
    vscode.window.showInformationMessage(`Got: ${result}`);
  };

  let helloWorldCommand = vscode.commands.registerCommand(
    "wechat-page.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from wechat-page!");
    }
  );

  let wePageCommand = vscode.commands.registerCommand(
    "wechat-page.wePage",
    function () {
      showPages();
    }
  );

  context.subscriptions.push(helloWorldCommand, wePageCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
