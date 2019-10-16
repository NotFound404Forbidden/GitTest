const {BrowserWindow, app} = require("electron");
const path = require('path');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        resizable:false,
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            experimentalFeatures: true
        }
    })

    mainWindow.loadURL(path.resolve(__dirname,'./view/index.htm'));

    mainWindow.on('close',()=>{mainWindow = null});

    mainWindow.webContents.openDevTools();
}

app.on('ready',createMainWindow);

app.on('window-all-closed',()=>{
    if(process.platform ==='darwin')
        app.quit();
});

app.on('activate',()=>{
    if(mainWindow ===null)
        createMainWindow();
});


