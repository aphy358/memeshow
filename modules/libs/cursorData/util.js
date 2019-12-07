
/**
 * 数组长度限制器
 * 
 * @param {*} dataList 目标数组
 * @param {*} limitLen 数组允许的最大长度
 * @param {*} isFromHead 是否从数组头部开始截取，true：从头部开始截取，false：从尾部截取
 */
export const arrayLenthLimit = (dataList, limitLen = 50, isFromHead = false) => {
  if(dataList.length > limitLen){
    // 如果 isFromHead 为数字类型，则以该数字作为起始下标开始截取
    if(typeof isFromHead === 'number'){
      return dataList.slice(isFromHead, limitLen + isFromHead)
    }

    let tmpList = !!isFromHead
      ? dataList.slice(0, limitLen)
      : dataList.slice(-limitLen)
    
    return tmpList
  }

  return dataList
}