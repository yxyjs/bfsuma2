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

// 注册赞助商
export const registerCustomer = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }) => ajax(BASE_URL + '/register/customer', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }, "POST")

// 获取支付信息
export const payBill = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }) => ajax(BASE_URL + '/pay/bill', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password })

// 发起支付请求
export const payRequest = ({ amount, payPhone, orderNo }) => ajax(BASE_URL + '/pay/request', { amount, payPhone, orderNo }, "POST")
