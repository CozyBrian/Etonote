import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath =
  process.env.NODE_ENV === "production"
    ? process.resourcesPath
    : app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, "assets", "icon.png"),
    width: 1300,
    height: 737,
    minWidth: 1300,
    minHeight: 737,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function registerListeners() {
  ipcMain.on("appClose", () => {
    mainWindow?.close();
  });
  ipcMain.on("appMinimize", () => {
    mainWindow?.minimize();
  });
  ipcMain.on("appMaximize", () => {
    mainWindow?.maximize();
  });
  ipcMain.on("appUnmaximize", () => {
    mainWindow?.unmaximize();
  });

  ipcMain.on("message", (_, message) => {
    console.log(message);
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
