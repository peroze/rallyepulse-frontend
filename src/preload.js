// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  cancelBluetoothRequest: () => ipcRenderer.send("cancel-bluetooth-request"),
  bluetoothPairingRequest: (callback) =>
    ipcRenderer.on("bluetooth-pairing-request", () => callback()),
  bluetoothPairingResponse: (response) =>
    ipcRenderer.send("bluetooth-pairing-response", response),
});

contextBridge.exposeInMainWorld("request", {
  request: (axios_request) => {
    console.log(axios_request);
    return ipcRenderer.invoke("request", axios_request);
  },
});

contextBridge.exposeInMainWorld("electron", {
  onWebSocketData: (callback) => {
    try {
      console.log("In electron.js");
      ipcRenderer.on("websocket-data", callback);
    } catch (error) {
      console.error("Error in onWebSocketData:", error);
    }
  },
});

contextBridge.exposeInMainWorld("socket", {
  socket: (stage) => {
    console.log(stage);
    return ipcRenderer.invoke("socket", stage);
  },
});
