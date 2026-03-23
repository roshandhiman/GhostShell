const { app, BrowserWindow } = require("electron");
const pty = require("node-pty");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("renderer/index.html");

  const shell = process.env.SHELL || "/bin/zsh";

  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  win.webContents.on("did-finish-load", () => {
    ptyProcess.onData(data => {
      win.webContents.send("terminal-output", data);
    });
  });

  require("electron").ipcMain.on("terminal-input", (event, input) => {
    ptyProcess.write(input);
  });
}

app.whenReady().then(createWindow);
