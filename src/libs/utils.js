
/**
 * 查找对象 arr 的字符串值在数组 obj 中的下标
 * 应用场景是：可能 obj 并不是数组 arr 中的某一项，但也许它转成字符串之后会和 arr 中的某一项相等，这时返回对应的下标
 * 
 * @param {*} arr 
 * @param {*} obj 
 */
export const indexOfStringify = (arr, obj) => {
  for (let i = 0, len = arr.length; i < len; ++i) {
    const elem = arr[i];
    if(JSON.stringify(elem) === JSON.stringify(obj)){
      return i
    }
  }

  return -1
}