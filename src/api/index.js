/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
import { type } from 'os'
// const BASE_URL = 'http://172.18.1.240:73'
// const BASE_URL = 'http://172.18.5.192:8081' //林刚
const BASE_URL = 'http://www.bfsuma.com' //正式
// const BASE_URL = '/api'

// 获取recommend
export const sponsorRecommend = (country, city) => ajax(BASE_URL + '/sponsor/recommend', { country, city })
// 获取国家
export const getAllCountry = () => ajax(BASE_URL + '/country/all')
// 搜索sponsor
export const searchSponsor = (country, city, keyword, rows, page, _) => ajax(BASE_URL + '/sponsor', { country, city, keyword, rows, page, _ })

// 检测email或phone是否被注册
export const registerCheck = (email, phone) => ajax(BASE_URL + '/register/check', { email, phone })

// 注册顾客
export const registerCustomer = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }) => ajax(BASE_URL + '/register/customer', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }, "POST")
