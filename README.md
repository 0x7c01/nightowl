# Nightowl

Nightowl is a flux extension for vscode editor. Automatically change `custom theme` at macos mojeva light or dark mode change or custom time (sunrise & sunset).

## Quick Start

> Install the extension with below using <kbd>⌘</kbd> + <kbd>p</kbd> or search for `vscode-night-mode` and install.

```bash
ext install vscode-nightowl
```
## Setting Extension

In your `workspace.json` or `settings.json`, give your choice of theme name to change.

```js
// light or dark theme
"nightowl.lightColorTheme": "Solarized Light" //Default light theme
"nightowl.darkColorTheme": "Default Dark+"    //Default dark theme

//mode, Select between "system" and "schedule", 
// when you are macos mojeva system and select "system" mode, nightowl will change vscode theme with system light or dark mode, 
// or nightowl will change vscode theme with sunrise and sunset.
"nightowl.mode": "system" // Default "system" mode

//Sunrise, Sunset in 24hrs format
"nightowl.sunRise": 7 //Morning 7 AM - Default 6 AM
"nightowl.sunSet": 17 //Afternoon 5 PM - Default 18 PM
```

#### Contributions

If you find a bug or want to a new feature, please file an issue. PR's are most welcome ;)

#### License

MIT © Gokulakrishnan

**Enjoy!**
