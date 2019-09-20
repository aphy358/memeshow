const path = require("path")
const { src, dest, watch, series } = require("gulp")
const less = require("gulp-less")
const rename = require("gulp-rename")

const srcDir = path.resolve(__dirname, "./src")
const distDir = path.resolve(__dirname, "./dist")

const lessGlob = [
  "src/*.less",
  "src/components/**/*.less",
  "src/packages/**/*.less",
  "src/pages/**/*.less"
]

function lessTask() {
  return src(lessGlob)
    .pipe(less())
    .pipe(
      rename(path => {
        path.extname = ".wxss"
      })
    )
    .pipe(dest("./src"))
}

function lessWatch() {
  watch(lessGlob, lessTask)
}

// const LessWatcher = watch(lessGlob)

// lessWatcher.on('change', (path, state) => {
//   console.info(`${path} has changed:`)
// })

exports.develop = lessWatch
exports.default = series(lessTask)
