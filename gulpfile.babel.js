import gulp from 'gulp';

// import nodemon from 'nodemon';
import babel from 'gulp-babel';
// const eslint = require('gulp-eslint');

// gulp.task('lint', () => {
//   gulp.src('app/**/*.js')
//   .pipe(eslint())
//   .pipe(eslint.format())
//   .pipe(eslint.failAfterError());
// })

// gulp.task('development', () => {
//   nodemon({
//     script: 'app/server.js',
//     exec: 'npm run babel-node -- --presets es2015,stage-2 --plugins typecheck',
//     verbose: true,
//     ignore: ['node_modules/*', 'public/*'],
//     env: { NODE_ENV: 'development' },
//     ext: 'js yml',
//   });
// });

gulp.task('production', ['lint'], () => {
  process.env.NODE_ENV = 'production';
  return gulp.src('app/server.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('dist'));
});
