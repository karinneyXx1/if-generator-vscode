import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('IF Generator plugin is now active!');

    let disposable = vscode.commands.registerCommand('if-generator.insertIf', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const position = editor.selection.active;
        const ifTemplate = 'if (condition) {\n    \n}';
        
        editor.edit(editBuilder => {
            editBuilder.insert(position, ifTemplate);
        }).then(success => {
            if (success) {
                vscode.window.showInformationMessage('IF statement inserted!');
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
