const gulp = require("gulp");
const refresh = require("gulp-refresh");
var concatCss = require("gulp-concat-css");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
sass.compiler = require("node-sass");

gulp.task("default", function() {
  return gulp
    .src("./js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/"))
    .pipe(refresh());
});
gulp.task("scssToCss", function() {
  return gulp
    .src("./css/*.scss")
    .pipe(sass())
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest("./build/"))
    .pipe(refresh());
});

gulp.task("watch", function() {
  gulp.watch("./js/*.js", gulp.series("default"));
  gulp.watch("./css/*.scss", gulp.series("scssToCss"));
});
