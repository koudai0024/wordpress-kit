const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const purgecss = require("gulp-purgecss");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const OUTDIR = "../theme1";

const compileSass = () => {
  return gulp
    .src("./src/assets/scss/style.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer())
    .pipe(
      purgecss({
        content: ["./src/**/*.php"],
      })
    )
    .pipe(gulp.dest(`${OUTDIR}`));
};

const compileJs = () => {
  return webpackStream(webpackConfig, webpack).pipe(
    gulp.dest(`${OUTDIR}/assets/js`)
  );
};

const copyImage = () => {
  return gulp
    .src("./src/assets/images/**/*.{png,jpg,jpeg,svg,ico}")
    .pipe(changed(`${OUTDIR}/assets/images`))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 65 }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest(`${OUTDIR}/assets/images`));
};

const compileWebp = () => {
  return gulp
    .src([
      "./src/assets/images/**/*.{png,jpg,jpeg}",
      "!./src/assets/images/favicons/**/*",
    ])
    .pipe(webp())
    .pipe(gulp.dest(`${OUTDIR}/assets/images`));
};

const copyPhp = () => {
  return gulp.src("./src/**/*.php").pipe(gulp.dest(`${OUTDIR}`));
};

const watch = () => {
  gulp.watch("./src/assets/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/assets/js/**/*.js", gulp.series("js"));
  gulp.watch(
    "./src/assets/images/**/*.{png,jpg,jpeg,svg,ico}",
    gulp.series("image")
  );
  gulp.watch("./src/assets/images/**/*.{png,jpg,jpeg}", gulp.series("webp"));
  gulp.watch("./src/**/*.php", gulp.series("php"));
};

exports.sass = compileSass;
exports.js = compileJs;
exports.image = copyImage;
exports.webp = compileWebp;
exports.php = copyPhp;
exports.watch = watch;
exports.default = gulp.series(
  compileSass,
  compileJs,
  copyImage,
  compileWebp,
  copyPhp
);
