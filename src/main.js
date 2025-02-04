const { Client } = require("@stomp/stompjs");
const SockJS = require("sockjs-client");

const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const axios = require("axios");
const path = require("path");
//const path = require("node:path");
//const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // fullscreen: false,
    // titleBarStyle : 'hidden',
    // titleBarOverlay : true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
    },
  });

  //mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  ipcMain.handle("socket", async (event, stage) => {
    var finish;
    const socket = new SockJS("http://localhost:8080/websocket");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("/stoptime/" + stage + "/updates");
        const subscription = client.subscribe(
          "/stoptime/" + stage + "/updates",
          (message) => {
            const data = JSON.parse(message.body);
            console.log("Stop Time Received: ", data);
            //setfinishes((prev) => [...prev, data]);
            if (mainWindow) {
              mainWindow.webContents.send("websocket-data", data);
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error("Error: " + frame.headers["message"]);
      },
    });
    client.activate();
    return finish;
  });
  var splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  splash.loadFile("splashscreen.html");
  splash.center();

  setTimeout(function () {
    splash.close();
    mainWindow.maximize();
    mainWindow.resizable = false;
    mainWindow.webContents.on(
      "select-bluetooth-device",
      (event, deviceList, callback) => {
        //console.log('Searching', device.deviceName);
        event.preventDefault();
        selectBluetoothCallback = callback;
        const result = deviceList.find((device) => {
          //console.log('Selecting device:', device.deviceName);
          return true;
        });
        if (result) {
          callback(result.deviceId);
        } else {
          console.log("No Device found");
        }
      }
    );

    ipcMain.on("cancel-bluetooth-request", (event) => {
      selectBluetoothCallback("");
    });

    ipcMain.on("bluetooth-pairing-response", (event, response) => {
      bluetoothPinCallback(response);
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.show();
  }, 7000);
};

ipcMain.handle("request", async (event, axios_request) => {
  console.log(axios_request);
  const response = await axios(axios_request);
  console.log(response);
  return { data: response.data, status: response.status };
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
