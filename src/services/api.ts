import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { baseUrl } from '../config'
import { logError } from '../utils/error'
interface Params {
  url: string
  data: any
  contentType?: string
}

export default {
  baseOptions (params: Params, method = 'GET') {
    const { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string
      data?: object | string
      method?: any
      header: object
      success: any
      error: any
      xhrFields: object
    }

    const setCookie = (res: {
      cookies: Array<{
        name: string,
        value: string,
        expires: string,
        path: string
      }>,
      header: {
        'Set-Cookie': string
      }
    }) => {
      if (res.cookies && res.cookies.length > 0) {
        let cookies = ''
        res.cookies.forEach((cookie, index) => {
          // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie};`
          }
        })

        Taro.setStorageSync('cookies', cookies)
      }

      if (res.header && res.header['Set-Cookie']) {
        Taro.setStorageSync('cookies', res.header['Set-Cookie'])
      }     
    }

    const option: OptionType = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      xhrFields: {
        withCredentials: true
      },
      success (res) {
        setCookie(res)
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error (e) {
        logError('api', '请求接口出现问题', e)
      }
    }

    return Taro.request(option)
  },
  get (url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post (url, data?: object, contentType?: string) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put (url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete (url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}