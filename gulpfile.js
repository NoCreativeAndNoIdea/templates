require('esbuild-register')
const path = require('path')
const {src, series, dest} = require('gulp')
const gulpSass = require('gulp-sass')
const dartSass = require('sass')
const autoprefixer = require('gulp-autoprefixer')
const {buildReact} = require('./script/build')

function compilerSass() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, 'src/**/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({cascade: false}))
    .pipe(dest(path.resolve(__dirname, 'dist')))
}

function build(cb) {
  buildReact()
  cb()
}

exports.default = series(build, compilerSass)
