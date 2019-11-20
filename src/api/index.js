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

// 推荐推荐人
export const sponsorRecommend = (country, city) => ajax(BASE_URL + '/sponsor/recommend', { country, city })

// 查找推荐人
export const searchSponsor = ({ page, rows, country, city, keyword }) => ajax(BASE_URL + '/sponsor', { page, rows, country, city, keyword })

// 顾客在个人中心关联上级/注册成功后关联推荐的上级
export const sponsorRelation = ({ id, distributorNo, updateTime }) => ajax(BASE_URL + '/sponsor/relation', { id, distributorNo, updateTime }, "POST")

// 判断顾客是否有绑定的上级
export const sponsorIsbind = (id) => ajax(BASE_URL + '/sponsor/isbind', { id }, "POST")

// 获取国家
export const getAllCountry = () => ajax(BASE_URL + '/country/all')


//DistributorController


//校验邮箱和手机号码唯一性
export const registerCheck = (email, phone) => ajax(BASE_URL + '/register/check', { email, phone })


// 注册顾客
export const distributorCustomer = (id) => ajax(BASE_URL + '/distributor/customer', { id })

// 注册赞助商
export const registerCustomer = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }) => ajax(BASE_URL + '/register/customer', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }, "POST")

// 获取商户信息
export const payBill = (id) => ajax(BASE_URL + '/pay/bill', { id })

// 发起支付请求
export const payRequest = ({ amount, payPhone, orderNo }) => ajax(BASE_URL + '/pay/request', { amount, payPhone, orderNo }, "POST")

// 获取支付状态
export const payStatus = (orderNo) => ajax(BASE_URL + '/pay/status', { orderNo })

// 提交收货地址
export const distributorAddress = ({ firstName, lastName, phone, address, country, city }) => ajax(BASE_URL + '/distributor/address', { firstName, lastName, phone, address, country, city }, "POST")

// 顾客升级为经销商
export const distributorUpgrade = ({ id, payPhone, orderNo }) => ajax(BASE_URL + '/distributor/upgrade', { id, payPhone, orderNo }, "POST")


