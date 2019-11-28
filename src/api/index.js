/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
import { type } from 'os'
export const BASE_URL = 'http://172.18.1.240:73' //测试

//export const BASE_URL = 'http://www.bfsuma.com' //正式

//---------------------------------------SponsorController-----------------------------------------

// 查找推荐人
export const searchSponsor = ({ page, rows, country, city, keyword }) => ajax(BASE_URL + '/sponsor', { page, rows, country, city, keyword })

// 推荐推荐人
export const sponsorRecommend = (country, city) => ajax(BASE_URL + '/sponsor/recommend', { country, city })

// 顾客在个人中心关联上级/注册成功后关联推荐的上级
export const sponsorRelation = ({ id, distributorNo, updateTime }) => ajax(BASE_URL + '/sponsor/relation', { id, distributorNo, updateTime }, "POST")

// 判断顾客是否有绑定的上级
export const sponsorIsbind = (id) => ajax(BASE_URL + '/sponsor/isbind', { id }, "POST")

//---------------------------------------DistributorController-----------------------------------------

//校验邮箱和手机号码唯一性
export const registerCheck = (email, phone) => ajax(BASE_URL + '/register/check', { email, phone })

//经销商设置密码
export const distributorSetpwd = ({ distributorNo, password }) => ajax(BASE_URL + '/distributor/setpwd', { distributorNo, password }, "POST")

// 注册成为顾客
// export const registerCustomer = ({ country, city, sponsor, name, gender, email, phone, productInterests, source, payPhone, orderNo }) => ajax(BASE_URL + '/register/customer', { country, city, sponsor, name, gender, email, phone, productInterests, source, payPhone, orderNo }, "POST")
export const registerCustomer = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }) => ajax(BASE_URL + '/register/customer', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, sponsor, upline, password }, "POST")



// 顾客升级为经销商
export const distributorUpgrade = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, id, payPhone, orderNo }) => ajax(BASE_URL + '/distributor/upgrade', { city, country, gender, firstName, lastName, email, phone, productInterests, source, mobile, id, payPhone, orderNo }, "POST")

// 登录
export const distributorLogin = ({ account, password, rememberPwd }) => ajax(BASE_URL + '/distributor/login', { account, password, rememberPwd })

// 顾客登录后信息展示页
export const distributorCustomer = (id) => ajax(BASE_URL + '/distributor/customer', { id })

// 忘记密码
export const distributorResetpwd = ({ phone, password, verifyCode, sendBy = "BFSUMA_PWD" }) => ajax(BASE_URL + '/distributor/resetpwd', { phone, password, verifyCode, sendBy }, "POST")

// 获取code
export const getTelCode = ({ sendBy = "BFSUMA_PWD", phone }) => ajax(BASE_URL + '/getTelCode', { sendBy, phone })

//填写地址
export const distributorAddress = ({ firstName, lastName, country, city, address, phone, distributorNo }) => ajax(BASE_URL + '/distributor/address', { firstName, lastName, country, city, address, phone, distributorNo }, "POST")

// 注册页埋点
export const registerSysLog = ({ request, module }) => ajax(BASE_URL + '/register/sysLog', { request, module }, "POST")


//---------------------------------------PaymentController-----------------------------------------

// 商户信息
// export const payBill = ({ city, country, gender, firstName, lastName, email, phone, productInterests, source, sponsor, distributorId }) => ajax(BASE_URL + '/pay/bill', { city, country, gender, firstName, lastName, email, phone, productInterests, source, sponsor, distributorId })
// 商户信息
export const payBill = (id) => ajax(BASE_URL + '/pay/bill', { id })

// 支付接口
export const payRequest = ({ amount, payPhone, orderNo }) => ajax(BASE_URL + '/pay/request', { amount, payPhone, orderNo }, "POST")

// 获取支付状态
export const payStatus = (orderNo) => ajax(BASE_URL + '/pay/status', { orderNo })


//---------------------------------------OtherController-----------------------------------------

// 获取国家
export const getAllCountry = () => ajax(BASE_URL + '/country/all')

// 获取城市
export const getAllCity = (id) => ajax(BASE_URL + '/district/upper', { id })







