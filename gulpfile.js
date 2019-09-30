const path = require("path")
const gulp = require("gulp")
const less = require("gulp-less")
const rename = require("gulp-rename")

const srcDir = path.resolve(__dirname, "./src")

const LESS_GLOB = [
  "src/*.less",
  "src/components/**/*.less",
  "!src/components/common/**/*",
  "src/packages/**/*.less",
  "src/pages/**/*.less"
]

function lessTask() {
  return gulp.src(LESS_GLOB, {
    base: "./src"
  })
  .pipe(less())
  .pipe(
    rename({
      extname: ".wxss"
    })
  )
  .pipe(gulp.dest("./src"))
}

function lessWatch() {
  gulp.watch(LESS_GLOB, lessTask)
}

exports.develop = lessWatch
exports.default = gulp.series(lessTask)
