const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  /**
   * 系统剪切板文字
   * @returns
   */
  const getClipboard = async () => {
    return await vscode.env.clipboard.readText();
  };

  /**
   * 当前编辑文件的路径
   *
   * @returns {object} - file
   * @returns {string} - file.filePath
   * @returns {string} - file.dirPath
   */
  const getCurFilePath = () => {
    // editor.document.uri.fsPath;
    const filePath = vscode.window.activeTextEditor.document.fileName;
    const dirPath = path.dirname(filePath);
    return {
      filePath,
      dirPath,
    };
  };

  /**
   * 获取文件夹下的文件
   * @param {string} dirPath
   * @returns {Object} file
   * @returns {allFiles} file.allFiles 文件和文件夹
   * @returns {files} file.files 仅文件
   */
  const getFloderFiles = (dirPath) => {
    const isFile = (filePath) => {
      return fs.lstatSync(filePath).isFile();
    };

    const allFiles = new Map();
    fs.readdirSync(dirPath).forEach((fileName) => {
      allFiles.set(fileName, path.join(dirPath, fileName));
    });

    const files = new Map(
      [...allFiles].filter(([, filePath]) => isFile(filePath))
    );

    return {
      allFiles,
      files,
    };
  };

  /**
   * 打开文件
   * @param {string} filePath
   * @returns {Promise|boolean}
   */
  const quickOpen = async (filePath) => {
    let fileUri = vscode.Uri.file(filePath);
    vscode.window.showTextDocument(fileUri);
    // return await vscode.commands.executeCommand("vscode.open", uri);
  };

  const showPages = async () => {
    // const allOpenFileNames = vscode.TextEdit;
    // console.log("🚀 :: showPages :: allOpenFileNames", allOpenFileNames)
    // const activeTextEditor = vscode.window.activeTextEditor.document.fileName;
    // console.log("🚀 :: showPages :: activeTextEditor", activeTextEditor);
    // const visibleTextEditors = vscode.window.visibleTextEditors;
    // const visDocs = visibleTextEditors.map(
    //   (editor) => editor.document.fileName
    // );
    // console.log("🚀 :: showPages :: visDocs", visDocs);
    const curFile = getCurFilePath();
    const { files: floderFiles } = getFloderFiles(curFile.dirPath);

    const chioseFileName = await vscode.window.showQuickPick(
      [...floderFiles.keys()],
      {
        placeHolder: "请选择要打开的文件",
      }
    );
    console.log("🚀 :: showPages :: chioseFileName", chioseFileName);

    const openedFileName = floderFiles.get(chioseFileName);
    await quickOpen(openedFileName);

    // vscode.window.showInformationMessage(`Got: ${openedFileName}`);
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
