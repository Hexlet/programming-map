var gulp = require("gulp");
var nodemon = require("nodemon");
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
  gulp.src('app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
})

gulp.task("development", function () {
    nodemon({
        script: "app/server.js",
        exec: './node_modules/babel-cli/bin/babel-node.js',
        verbose: true,
        ignore: ["node_modules/*", "public/*"],
        env: { 'NODE_ENV': 'development' },
        ext: "js yml"
    })
});

gulp.task("production", ['lint'], function () {
    process.env.NODE_ENV = "production";
    return gulp.src('app/server.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
})
