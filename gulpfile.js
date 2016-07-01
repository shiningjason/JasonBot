const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('heroku', () => {
  nodemon({
    script: 'heroku',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  })
})
