const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");

const scssFiles = "src/scss/style.scss";

// CSS destination
const cssDest = "./css";

// Options for development
const sassDevOptions = {
  outputStyle: "expanded",
};

// Options for production
const sassProdOptions = {
  outputStyle: "compressed",
};

gulp.task("sassdev", function () {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassDevOptions).on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task("sassprod", function () {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassProdOptions).on("error", sass.logError))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(cssDest));
});

gulp.task("watch", function () {
  gulp.watch(scssFiles, ["sassdev", "sassprod"]);
});

gulp.task("default", ["sassdev", "sassprod", "watch"]);
