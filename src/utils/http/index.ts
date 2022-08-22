// 1. 引入axios依赖包
import axios from 'axios'
import { Md5 } from 'ts-md5/dist/md5'
import moment from 'moment'

// 2. axios创建对象
const request = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_APP_URL,
  // baseURL: "",
  timeout: 20000 //超时时间
})
// 3. ，请求拦截器，请求发送出去之前触发的
request.interceptors.request.use(
  (config) => {
    const appKey = import.meta.env.VITE_APP_KEY
    const time = Date.parse(moment().format('YYYY-MM-DD HH:mm:ss')) / 1000
    const token = Md5.hashStr(appKey + time)
    // config 接口请求的配置信息,添加公共请求参数
    if (time && token) {
      config.data = Object.assign({ time, token }, config.data)
    }
    return config
  },
  (error) => {
    //报错的是定义前置拦截器时候抛出一个报错的信息
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  (response) => {
    //响应回来的数据操作
    return { data: response.data }
  },
  (error) => {
    //报错的是时候抛出一个报错的信息
    return Promise.reject(error)
  }
)
// 5. 抛出对象的信息
export default request
