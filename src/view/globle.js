const { remote } = require('electron')
const toastr = require('toastr')
const {Logger} = require('../bll/log')

toastr.options = {
    positionClass: "toast-bottom-right",
    showDuration: "300",                   //显示动作时间
    hideDuration: "1000",                  //隐藏动作时间
    timeOut: "2000",                       //自动关闭超时时间
}

let log = new Logger();

document.getElementById("window-close").addEventListener('click', () => {
    remote.app.quit();
});

document.getElementById("window-mini").addEventListener('click', () => {
    remote.getCurrentWindow().minimize();
});

document.getElementById("window-refresh").addEventListener('click', () => {
    remote.getCurrentWindow().reload();
});

document.getElementById("logo").addEventListener('click', () => {
    remote.getCurrentWindow().webContents.openDevTools();
});

document.getElementById("img-run").addEventListener('click', () => {
    let runel = document.getElementById("img-run");
    if (runel.getAttribute('src') === '../icon/run.svg') {
        runel.setAttribute('src', '../icon/pause.svg')

        toastr.success("开始运行")
    }
    else
        runel.setAttribute('src', '../icon/run.svg');
});



/**
 * 监测在线状态
 */
function onlineMonitor(){
    function checkOnline(){
        let onlinestatus = document.getElementById("online-status");

        navigator.onLine?
        onlinestatus.setAttribute('src','../icon/off.svg'):
        onlinestatus.setAttribute('src','../icon/on.svg');
    }

    checkOnline();

    setInterval(()=>{
        checkOnline();
    },5000);
}

onlineMonitor();

