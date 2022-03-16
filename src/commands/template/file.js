const vscode = require("vscode");
const { workspace, window } = vscode;
const { fs } = workspace;
const path = require("path");

class File {
  constructor() {}

  // 创建模板入口
  async createTemplateMain({ context }) {
    console.log("workPath", context._fsPath, context.fsPath);
    const workspaceFolders = this.getWorkspaceFolders(context.fsPath);
    const toPath = context._fsPath;
    const tempPathRoot =
      workspaceFolders[0].uri._fsPath + "/.vscode/" + "template";
    const fromPath = this.fromatPath(tempPathRoot);
    const fileinfos = await fs.readDirectory(fromPath);
    const tempList = fileinfos.map((temp) => temp[0]);
    window.showQuickPick(tempList).then((tempName) => {
      const currFileInfo = fileinfos.filter((item) => item[0] === tempName)[0];
      const type =
        currFileInfo[1] === vscode.FileType.File ? "File" : "Directory";
      window
        .showInputBox({ placeHolder: "请输入模板名" })
        .then(async (value) => {
          if (!value) {
            vscode.window.showInformationMessage("模板名字不能为空!");
            return;
          }
          const pathInfo = {
            to: this.fromatPath(toPath + "/" + value),
            from: this.fromatPath(tempPathRoot + "/" + tempName),
            fname: value,
          };

          if (type === "Directory") {
            fs.createDirectory(pathInfo.to).then(async () => {
              this.readDirectory(pathInfo);
            });
          } else if (type === "File") {
            this.createTemplateFile(pathInfo);
          }
        });
    });
  }

  // 递归创建
  async readDirectory({ to, from, fname }) {
    console.log(666, {
      to,
      from,
      fname,
    });
    const fileinfos = await fs.readDirectory(from);
    fileinfos.map(async (item) => {
      const tempName = item[0];
      const toName = fname ? `${fname}.${tempName.split(".")[1]}` : tempName;
      console.log(777, { tempName, toName });
      if (item[1] === vscode.FileType.File) {
        this.createTemplateFile({
          from: this.fromatPath(from.path + "/" + tempName),
          to: this.fromatPath(to.path + "/" + toName),
        });
      } else {
        fs.createDirectory(this.fromatPath(to.path + "/" + tempName)).then(
          async () => {
            await this.readDirectory({
              from: this.fromatPath(from.path + "/" + tempName),
              to: this.fromatPath(to.path + "/" + tempName),
            });
          }
        );
      }
    });
  }

  // 格式化 path
  fromatPath(url) {
    return vscode.Uri.file(path.normalize(url));
  }

  async createTemplateFile({ to, from }) {
    const readFileData = await vscode.workspace.fs.readFile(from);
    let utf8data = new TextDecoder("utf-8").decode(readFileData);
    await vscode.workspace.fs.writeFile(to, Buffer.from(utf8data), {
      create: true,
    });
    //  await vscode.workspace.fs.copy( vscode.Uri.file(path.normalize(copyPath)), vscode.Uri.file(path.normalize(toPath)),true )
  }

  getWorkspaceFolders(workPath) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const item = workspaceFolders.filter(
      (item) => !workPath.indexOf(item.uri._fsPath)
    );
    return item;
  }
}

module.exports = new File();
