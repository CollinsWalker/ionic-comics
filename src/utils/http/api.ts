import http from './index'
import { storage } from '@/utils/storage'
// import { Md5 } from 'ts-md5/dist/md5'
// import moment from 'moment'

// 获取本地用户信息
const utoken = storage.get('utoken')

// 分类
export const getTagList = () => {
  return http.post('/tag/getList')
}
// 地区
export const getAreaList = () => {
  return http.post('/tag/getAreaList')
}
// 更新数据
export const getUpdateBookList = (params: object) => {
  return http.post('/books/getupdate', params)
}
// 漫画详情
export const getBookDetail = (obj: { id: any }) => {
  const params = {
    id: obj.id, // 漫画id
    utoken: utoken || '' // 登录用户token
  }
  return http.post('/books/detail', params)
}
// 章节列表
export const getChapterList = (params: object) => {
  return http.post('/chapters/getList', params)
}
// 章节详情
export const getChapterDetail = (params: object) => {
  return http.post('/chapters/detail', params)
}
// 新番榜
export const getNewBookList = () => {
  const params = {
    num: 6
  }
  return http.post('/books/getNewest', params)
}
// 推荐榜
export const getTopList = () => {
  const params = {
    num: 6
  }
  return http.post('/books/getTops', params)
}
// 人气榜
export const getHotList = () => {
  const params = {
    num: 6
  }
  return http.post('/books/getHot', params)
}
// 根据分类获取漫画列表
export const getBookList = (params: object) => {
  return http.post('/tag/getBookList', params)
}
// 用户登录
export const loginUser = (params: object) => {
  return http.post('/account/login', params)
}
// 用户注册
export const registerUser = (params: object) => {
  return http.post('/account/register', params)
}
// 用户注销
export const logoutrUser = () => {
  return http.post('/account/logout')
}
// 搜索
export const getSearch = (params: object) => {
  return http.post('/books/search', params)
}
// 漫画收藏获取
export const getIsFavor = (obj: { id: any }) => {
  const params = {
    book_id: obj.id, // 漫画id
    utoken: utoken || '' // 登录用户token
  }
  return http.post('/users/isfavor', params)
}
// 漫画收藏获取
export const getSwitchFavor = (obj: { id: any }) => {
  const params = {
    book_id: obj.id, // 漫画id
    utoken: utoken || '' // 登录用户token
  }
  return http.post('/users/switchfavor', params)
}
// 用户书架获取
export const getBookShelf = () => {
  const params = {
    utoken: utoken || ''
  }
  return http.post('/users/bookshelf', params)
}
