// 手机号码校验规则
export const mobileValidator = /(^1[0|1|2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/

// 名称校验：只能是中文/数字/英文字母 以及特殊符号[]【】（），？。:;
export const nameCheckValidator = /^[A-Za-z\d\u2E80-\u9FFF【】\[\]\(\)\-\,\，\?\？\.\。\;\:\：\；\\\、\“\”\‘\']+$/
