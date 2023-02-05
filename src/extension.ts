import { mkdir, open } from "fs/promises";
import * as vscode from "vscode";
import path = require("path");

export function activate(context: vscode.ExtensionContext) {
  if (vscode.workspace.workspaceFolders === undefined) {
    vscode.window.showErrorMessage("BKM Notes: Working folder not found.");
  }

  const workSpaceFolderPath = vscode.workspace.workspaceFolders![0].uri.path;
  const fileName = "bkm-notes.md";
  const pathToVscode = path.join(workSpaceFolderPath, ".vscode");
  const pathToVscodeAdjusted =
    pathToVscode.charAt(0) === "\\" ? pathToVscode.substring(1) : pathToVscode;
  const fullPath = path.join(pathToVscode, fileName);
  const fullPathAdjusted =
    fullPath.charAt(0) === "\\" ? fullPath.substring(1) : fullPath;

  let noteCmd = vscode.commands.registerCommand("bkm.quickNote", async () => {
    try {
      await mkdir(pathToVscodeAdjusted);
    } catch (err) {}
    await (await open(fullPathAdjusted, "a")).close();

    const openPath = vscode.Uri.file(fullPath);
    vscode.workspace
      .openTextDocument(openPath)
      .then((file) => vscode.window.showTextDocument(file));

    vscode.window.showInformationMessage(`${pathToVscode}`);
    vscode.window.showInformationMessage(`${pathToVscodeAdjusted}`);
  });

  context.subscriptions.push(noteCmd);
}

export function deactivate() {}
