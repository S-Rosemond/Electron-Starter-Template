const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("path");

let win = null;

function createMenu() {
  const menu = [
    {
      label: "Window",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { type: "separator" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [{ role: "minimize" }],
    },
  ];

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
}

const defaultProps = {
  width: 500,
  height: 600,
  resizable: false,
  show: false,
  webPreferences: {
    preload: join(__dirname, "app/Javascript/preload.js"),
  },
};

function createWindow(props = defaultProps, url) {
  win = new BrowserWindow(props);

  win.loadFile(url);

  win.on("ready-to-show", win.show);
}

app.on("ready", () => {
  createWindow();
  createMenu();

  win.on("closed", () => (win = null));
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
