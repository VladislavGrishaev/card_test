import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import newer from 'gulp-newer';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

const paths = {
    html: { src: 'src/**/*.html', dest: 'dist/' },
    styles: { src: 'src/scss/**/*.scss', dest: 'dist/css/' },
    scripts: { src: 'src/js/**/*.js', dest: 'dist/js/' },
    images: { src: 'src/img/**/*.{jpg,jpeg,png,gif,svg}', dest: 'dist/img/' },
    fonts: { src: 'src/fonts/**/*.{woff,woff2,ttf,eot,otf}', dest: 'dist/fonts/' },
};

export const html = () =>
    gulp
        .src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));

export const styles = () =>
    gulp
        .src(paths.styles.src, { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            {
                overrideBrowserslist:  [ "last 4 version" ],
                cascade: false,
                grid: true
            })
        )
        .pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }));

export const scripts = () =>
    gulp
        .src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: '.' }));

export const images = () =>
    gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(gulp.dest(paths.images.dest));

export const fonts = () => gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));

export const watch = () => {
    const bs = browserSync.create();

    bs.init({ server: { baseDir: './dist' } });

    gulp.watch(paths.html.src, html).on('change', bs.reload);
    gulp.watch(paths.styles.src, styles).on('change', bs.reload);
    gulp.watch(paths.scripts.src, scripts).on('change', bs.reload);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
};

export default gulp.series(
    gulp.parallel(html, styles, scripts, images),
    watch
);
