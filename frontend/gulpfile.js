const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const buildStyles = () => {
    return src ('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(dest('src/css'))
};

const watchTask = () => {
    watch(['src/sass/**/*.scss'], buildStyles)
};

exports.default = series(buildStyles, watchTask)