// 1. 引入axios依赖包
import axios from 'axios'
import { Md5 } from 'ts-md5/dist/md5'
import moment from 'moment'
import { /* alertController, */ toastController } from '@ionic/vue'
// import router from '@/router'

// 消息弹窗
const toastShow = async (message: string, color: string) => {
  const toast = await toastController.create({
    message,
    duration: 3000,
    color,
    position: 'top'
  })
  return toast.present()
}

// const showAlert = async (message: string) => {
//   const alert = await alertController.create({
//     header: '提示',
//     message: message,
//     buttons: [
//       {
//         text: '取消',
//         role: 'cancel',
//         handler: () => {
//           console.log('取消')
//         }
//       },
//       {
//         text: '确认',
//         role: 'confirm',
//         handler: () => {
//           router.replace({ path: '/login' })
//         }
//       }
//     ]
//   })

//   await alert.present()
// }

// 2. axios创建对象
const request = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_APP_URL,
  // baseURL: "",
  timeout: 20000 //超时时间
})
// 3. 请求拦截器，请求发送出去之前触发的
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
    const { data } = response // 解构
    // if (data.code === RequestEnums.OVERDUE) {
    //   // 登录信息失效，应跳转到登录页面，并清空本地的token
    //   localStorage.setItem('token', '') // router.replace({ //   path: '/login' // })
    //   return Promise.reject(data)
    // } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
    // if (data.code && data.code !== RequestEnums.SUCCESS) {
    //   toastShow(data, 'danger') // 此处也可以使用组件提示报错信息
    //   return Promise.reject(data)
    // }
    // console.log(data, 'data')
    // console.log(config, 'config')

    //响应回来的数据操作
    return { data}
  },
  (error) => {
    //报错的是时候抛出一个报错的信息
    const { response } = error
    // if (response.data.code === 2) {
    //   showAlert('未授权，请重新登录')
    //   return
    // }
    if (response) {
      showStatus(response.status)
    }
    // return Promise.reject(error)
  }
)

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请重新登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求出错'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网络错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网络超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      message = `连接出错(${status})!`
  }
  return toastShow(message, 'danger')
  // return `${message}，请检查网络或联系管理员！`
}

// 5. 抛出对象的信息
export default request
