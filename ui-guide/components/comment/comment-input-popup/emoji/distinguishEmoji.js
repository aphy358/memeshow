import EMOJIS from './emoj'
const REG = new RegExp(/[\'\[]?([^\[\[\]\]]*)[\'\]]?/ig);

  
// 从字符串中将 emoji 识别出来
function distinguishEmoji(str) {
  const strArr = str.match(REG);

  // 用于暂存不是 emoji 的字符串，目的是将所有连续的、非 emoji 的字符串作为一个元素
  let storedStr = ''
  let messageArr = []

  for (let i = 0; i < strArr.length; i++) {
    const ele = strArr[i]
    const emojiMatched = EMOJIS[ele]

    if(emojiMatched){
      // 如果匹配到了 emoji，则先将之前暂存的 storedStr 先存入数组，然后清空 storedStr，用于保存下一段连续的、非 emoji 字符串
      if(storedStr !== ''){
        messageArr.push({
          type: 'text',
          content: storedStr
        })
        storedStr = ''
      }

      // 然后将 emoji 存入数组
      messageArr.push({
        type: 'emoji',
        content: emojiMatched
      })

    }else{
      storedStr += ele
    }
  }

  // 最后如果暂存的字符串不为空，则将暂存的字符串存入数组
  if(storedStr !== ''){
    messageArr.push({
      type: 'text',
      content: storedStr
    })
  }

  return messageArr
}


module.exports = {
  distinguishEmoji
}
