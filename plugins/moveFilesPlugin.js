// 该插件用于将小程序分包对应的公共包移动到对应的分包目录下
// 参考： https://github.com/Viyozc/useless-files-webpack-plugin/blob/master/index.js

const fs = require('fs')
const shelljs = require('shelljs')

class MoveFilesPlugin {
  constructor (options) {
    this.opts = options
  }
  apply (compiler) {
    let _this = this
    compiler.hooks.afterEmit.tapAsync('MyPlugin', (compiler, done) => {
      _this.moveFiles(_this.opts)
      done()
    })
  }

  /**
   * 移动文件
   */
  moveFiles (opts) {
    for (let i = 0; i < opts.length; i++) {
      fs.exists(opts[i].from, function(exists){
        if(exists){
          const r = fs.createReadStream(opts[i].from);
          const w = fs.createWriteStream(opts[i].to);
          r.pipe(w);
          r.on('end', () => {
            shelljs.rm(opts[i].from)
          });
        }else{
          // 如果没找到对应的文件，则在目标目录下创建一个空的文件
          fs.writeFile(opts[i].to, '', function(error){})
        }
      })
    }
  }

}

module.exports = MoveFilesPlugin