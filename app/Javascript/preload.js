const { contextBridge, ipcRenderer } = require("electron");

const API = {};

contextBridge.exposeInMainWorld("api", API);
