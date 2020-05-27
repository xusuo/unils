const mobileReg = /(^1[0|1|2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/ //手机号，11位纯数字
const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/ //密码，6-15位英文数字组合
const chineseReg = /[u4e00-u9fa5]/ //中文
const digitalReg = /^\d+(\.{1}\d+)?$/ //数字
const priceReg = /^[0-9]+([.]{1}[0-9]{1,2})?$/ //价格数值
const intReg = /^[0-9]+$/ //整数
const hostReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}|(:[0-9]{1,4}))+\.?/ //域名
const nickReg = /^[A-Za-z\d\u2E80-\u9FFF【】\[\]\(\)\-\,\，\?\？\.\。\;\:\：\；\\\、\“\”\‘\']+$/ //昵称，只能是中文/数字/英文字母 以及特殊符号
const accountReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/ //账号，5-20位英文数字组合
const emailReg = /^([a-zA-Z0-9_])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ //邮箱

export { mobileReg, passwordReg, chineseReg, digitalReg, priceReg, intReg, hostReg, nickReg, accountReg, emailReg }
