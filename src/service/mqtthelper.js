import mqtt from 'mqtt'
import { mqttConfig } from '../model/config/mqttconfig'

class mqtthelper {

  /**
   *Creates an instance of mqtthelper.
   * @param {mqttConfig} config mqtt配置类
   * @param {(message:string)=>{}} cb 日志回调函数
   * @memberof mqtthelper
   */
  constructor(config, cb) {
    this.config = config;
    this.cb = cb;
    this.init(cb);
  }

  /**
   * 初始化操作
   * @memberof mqtthelper
   */
  init() {
    this.client = mqtt.connect(this.config.url, {
      port: this.config.port,
      username: this.config.username,
      password: this.config.pwd
    });

    this.client.on('message', (topic, message) => {
      if (this.cb !== null)
        cb(message.toString());
    })
  }


  /**
   * 发布主题
   * @param {string} topic 主题
   * @param {(string | Buffer)} message 消息
   * @param {(message:any)=>{}} cb 日志回调函数
   * @returns {boolean} ret 返回是否成功发送
   * @memberof mqtthelper
   */
  publish(topic, message) {
    let ret = true;
    this.client.publish(topic, message, (error) => {
      if (error !== null && error !== undefined) {
        if (cb != null)
          cb(error.stack);
        ret = false;
      }
    });

    return ret;
  }

  /**
   * 订阅主题
   * @param {(string | string[])} topic
   * @param {LogCallback} cb
   * @returns {boolean}
   * @memberof mqtthelper
   */
  subscribe(topic) {
    let ret = true;
    this.client.subscribe(topic, (error, granted) => {
      if (error !== null && error !== undefined) {
        if (cb !== null)
          cb(error);
        ret = false;
      }
    })
    return ret;
  }

  end() {
    this.client.end();
  }
}

export { mqtthelper }