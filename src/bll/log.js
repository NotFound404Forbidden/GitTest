
let util = require('./util');

let logdiv = document.getElementById("log-div");
let isScrollToBottom = true;

/**
 * 写日志
 * @param {string} level
 * @param {string} message
 */
function writeLog(level, message) {
    //当日志div中的日志条目大于2000时自动删除最顶上一条
    while (logdiv.childNodes.length > 2000) {
        logdiv.childNodes[0].remove();
    }
    var date = new Date();
    date.toString();
    logdiv.innerHTML += `<span class="${level}">[${util.dateFormate(date,'yyyy-MM-dd HH:mm:ss')}] : ${message}</span><br>`;

    //滑块跟踪至底端
    if(isScrollToBottom)
        logdiv.scrollTop = logdiv.scrollHeight;
}

//当滚动条在最底部时滚动条实时跟踪至底部
logdiv.onscroll = () => {
    //判断滚动条滑块是否在最底部
    if (logdiv.scrollTop + logdiv.clientHeight == logdiv.scrollHeight)
        isScrollToBottom = true;
    else
        isScrollToBottom = false;
}


/**
 * 记录日志类
 * @class Logger
 */
exports.Logger = class Logger {

    /**
     * 记录错误日志
     * @param {string} error
     * @memberof Logger
     */
    writeError(error) {
        writeLog("error", error);
    }

    /**
     * 记录调试数据
     * @param {string} message
     * @memberof Logger
     */
    writeDebug(message) {
        writeLog("debug", message);
    }


    /**
     * 记录普通数据
     * @param {*} message
     * @memberof Logger
     */
    writeInfo(message) {
        writeLog("info", message);
    }
}

