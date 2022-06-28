const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const isProd = process.env.NODE_ENV === 'prod';
const { src, dest, watch } = require('gulp');

const htmlFile = [
    'src/*.html'
]
const rootProd = [
    'html'
]

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(rootProd));
}

function css() {
    return gulp.src('src/sass/style.scss')
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest(rootProd+'/css/'));
}

function js() {
    return gulp.src('src/js/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('all.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest(rootProd+'/js'));
}

function img() {
    return gulp.src('src/img/*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest(rootProd+'/img/'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './'+rootProd
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('src/img/**/*.*', gulp.series(img));

    return;
}

function del() {
    return gulp.src(rootProd+'/*', {read: false})
        .pipe(clean());
}

function page() {
    return src('./templates/page.pug')
      .pipe(
        pug({
         pretty: false
        })
      )
      .pipe(dest('./src'));
  };


exports.page = page;
exports.css = css;
exports.html = html;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(html, css, js, img, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, img);
