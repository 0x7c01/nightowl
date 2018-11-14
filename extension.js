// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const runJxa = require('run-jxa');
const os = require('os');

const nightowlConfig = vscode.workspace.getConfiguration('nightowl');

// Default options
const options = {
    darkColorTheme: nightowlConfig.darkColorTheme || 'Default Dark+',
    lightColorTheme: nightowlConfig.lightColorTheme || 'Solarized Light',
    sunRise: 6,
    sunSet: 18,
    platform: os.platform(),
    mode: nightowlConfig.mode || 'schedule',        // schedule: sunRise sun Set    system: mac
    setIntervalId: null,
};

if (nightowlConfig.darkColorTheme) {
    options.darkColorTheme = nightowlConfig.darkColorTheme;
}

if (nightowlConfig.lightColorTheme) {
    options.lightColorTheme = nightowlConfig.lightColorTheme;
}

if (nightowlConfig.sunRise) {
    options.sunRise = nightowlConfig.sunRise;
}

if (nightowlConfig.sunSet) {
    options.sunSet = nightowlConfig.sunSet;
}

if (nightowlConfig.mode) {
    if (nightowlConfig.mode === 'system' || nightowlConfig.mode === 'schedule') {
        options.mode = nightowlConfig.mode;
    } else {
        options.mode = 'schedule';
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // The code you place here will be executed every time your command is executed
    const config = vscode.workspace.getConfiguration('workbench');
    const prop = 'Application("System Events").appearancePreferences.darkMode';
    const currentHours = new Date().getHours();
    
    changeTheme();
    options.setIntervalId = setInterval(() => {
        changeTheme();
    }, 60000);
    
    function changeTheme() {
        // same as system
        if (options.platform === 'darwin' && options.mode === 'system') {
            // now is dark mode
            if (runJxa.sync(`return ${prop}()`)) {
                if (config.get('colorTheme') !== options.darkColorTheme) {
                    config.update('colorTheme', options.darkColorTheme, true);
                    vscode.window.showInformationMessage(`Activated ${options.darkColorTheme} theme`);
                }
            } else { // now is light mode
                if (config.get('colorTheme') !== options.lightColorTheme) {
                    config.update('colorTheme', options.lightColorTheme, true);
                    vscode.window.showInformationMessage(`Activated ${options.lightColorTheme} theme`);
                }
            }
        } else {   //now use schedule
            // light mode
            if (currentHours >= options.sunRise && currentHours <= options.sunSet ) {
                if (config.get('colorTheme') !== options.lightColorTheme) {
                    config.update('colorTheme', options.lightColorTheme, true);
                    vscode.window.showInformationMessage(`Activated ${options.lightColorTheme} theme`);
                }
            } else {
                if (config.get('colorTheme') !== options.darkColorTheme) {
                    config.update('colorTheme', options.darkColorTheme, true);
                    vscode.window.showInformationMessage(`Activated ${options.darkColorTheme} theme`);
                }
            }
        }
    }

    //context.subscriptions.push(activateEvent);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    if (options.setIntervalId) {
        clearInterval(options.setIntervalId);
    }

}
exports.deactivate = deactivate;
