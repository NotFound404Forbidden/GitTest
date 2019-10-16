import http from 'http'


/**
 * 发送http请求
 *
 * @param {http.RequestOptions} option
 * @returns {string} ret
 */
function request(option){
    let ret;
    let req = http.request(option, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            ret = data.toString();
        })
    })
    req.end();
    return ret;
}

export{request}