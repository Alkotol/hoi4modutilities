import * as vscode from 'vscode';
import { previewManager } from './previewmanager';
import { contextContainer } from './context';
import { PreviewCommand, PreviewWebviewType, ViewTypeDDS } from './constants';
import { DDSViewProvider } from './ddsviewprovider';
import { convertNodeFromFileToJson } from './hoiformat/schema';
import { parseHoi4File } from './hoiformat/hoiparser';

export function activate(context: vscode.ExtensionContext) {
    contextContainer.current = context;
    context.subscriptions.push({
        dispose() {
            contextContainer.current = null;
        }
    });

    context.subscriptions.push(vscode.commands.registerCommand(PreviewCommand, previewManager.showPreview, previewManager));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(previewManager.onCloseTextDocument, previewManager));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(previewManager.onChangeTextDocument, previewManager));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(previewManager.onChangeActiveTextEditor, previewManager));
    context.subscriptions.push(vscode.window.registerWebviewPanelSerializer(PreviewWebviewType, previewManager));
    context.subscriptions.push(vscode.window.registerCustomEditorProvider(ViewTypeDDS, new DDSViewProvider() as any));

    vscode.commands.registerCommand('hoi4modutilities.test', () => {
        if (vscode.window.activeTextEditor) {
            const doc = vscode.window.activeTextEditor.document.getText();
            try {
                const fs = require('fs');  
                fs.writeFileSync('D:/temp/out.txt', JSON.stringify(convertNodeFromFileToJson(parseHoi4File(doc))));
            } catch (e) {
                console.error(e);
            }
        }
    });
	
	// Trigger context value setting
	previewManager.onChangeActiveTextEditor(vscode.window.activeTextEditor);
}

export function deactivate() {}