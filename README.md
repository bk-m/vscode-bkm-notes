# bkm-notes README

Quickly create/open a note file in the current project's `.vscode` folder.

## Features

Adds commans `BKM - Open note in current project` to the command palette which will open the file `<projcet_root>/.vscode/bkm-notes.md`.
The file will be created if it does not exist already.

The command is bound to `Alt+m n` by default. This binding can be changed by searching for `bkm.quickNote` in your keyboard shortcuts.

## Known Issues

This extension uses `workspaceFolders[0]` to determine the current workspace. This may break in multi-root workspaces.
