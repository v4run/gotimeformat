'use strict';
import {ExtensionContext, commands, TextEditor, TextEditorEdit} from 'vscode';

export function activate(context : ExtensionContext) {
    let disposable = commands.registerTextEditorCommand('generategotimelayout', (textEditor : TextEditor, textEditorEdit : TextEditorEdit) => {
        parseSelection(textEditor, textEditorEdit);
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}

// the regex used to match the selections
const regex = /YYYY|YY|MMMM|MMM|MM|M|DD|D|hh|HH|h|wwww|www|mm|m|ss|s|f|F|a|A|-Z:Z:Z|Z:Z:Z|-Z:Z|Z:Z|-ZZZ|ZZZ|-ZZ|ZZ|-Z|Z|z/g;

// 'custom to go layout' mapping object
const formatMap = {
    "YYYY": "2006",
    "YY": "06",
    "MMMM": "January",
    "MMM": "Jan",
    "MM": "01",
    "M": "1",
    "DD": "02",
    "D": "2",
    "hh": "03",
    "HH": "15",
    "h": "3",
    "wwww": "Monday",
    "www": "Mon",
    "mm": "04",
    "m": "4",
    "ss": "05",
    "s": "5",
    "f": "0",
    "F": "9",
    "a": "pm",
    "A": "PM",
    "z": "MST",
    "-Z:Z:Z": "-07:00:00",
    "Z:Z:Z": "Z07:00:00",
    "-Z:Z": "-07:00",
    "Z:Z": "Z07:00",
    "-ZZZ": "-070000",
    "ZZZ": "Z070000",
    "-ZZ": "-0700",
    "ZZ": "Z0700",
    "-Z": "-07",
    "Z": "Z07"
};

/**
 * generateLayout returns the go equivalent of the given time format layout.
 */
export function generateLayout(text : String) {
    return text.replace(regex, (m) => {
        return formatMap[m];
    })
}

/**
 * parseSelection parses the selections in the editor and replaces them with the
 * go time format.
 */
function parseSelection(textEditor : TextEditor, textEditorEdit : TextEditorEdit) {
    const doc = textEditor.document;
    textEditor.selections.forEach(s => {
        doc.validateRange(s) && textEditorEdit.replace(s, generateLayout(doc.getText(s)));
    })
}
