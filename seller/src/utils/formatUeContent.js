// 处理编辑器里面的图片URL路径问题
export function replaceUEImgUrl(content) {
  // 替换测试host
  // http://prvv0heh5.bkt.clouddn.com
  content = content.replace(/http\:\/\/img\.91falipin\.com/g, '${{ytImgHost}}')
  return content
}

export function recoverUEImgUrl(content) {
  content = content.replace(/\$\{\{ytImgHost\}\}/g, 'http://img.91falipin.com')
  return content
}