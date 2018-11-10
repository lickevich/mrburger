import gulp from 'gulp';
import del from 'del';
import ghPages from 'gulp-gh-pages';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

import svgsprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';

import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

//browser-sync
const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

//Пути
const paths = {
  styles: {
    src: 'src/styles/scss/main.scss',
    watch: 'src/styles/scss/**/*.scss',
    dest: 'dist/styles/'
  },
  stylesNlz: {
    src: 'node_modules/normalize.css/normalize.css',
    dest: 'dist/styles/found'
  },
  scripts: {
    src: 'src/scripts/main.js',
    dest: 'dist/scripts/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'dist/images/'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'dist/fonts/'
  },
  svgSprite: {
    src: 'src/sprite/*.svg',
    dest: 'dist/images/'
  }
};

//Удаление папки dist
const clean = () => del(['dist']);

//Стили
function styles() {
  let plugins = [
    autoprefixer({
      browsers: ['last 10 version', 'IE 11', 'Firefox ESR']
    }),
    pxtorem({
      propList: ['*'],
      selectorBlackList: [':root'],
      minPixelValue: 7
    })
  ];
  return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.styles.dest));
}

//Перенос файлов
function stylesNlz() {
  return gulp.src(paths.stylesNlz.src).pipe(gulp.dest(paths.stylesNlz.dest));
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.dest));
}

function images() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.scripts.dest));
}

function svgSprite() {
  return gulp
    .src(paths.svgSprite.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: $ => {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(
      svgsprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg'
          }
        }
      })
    )
    .pipe(gulp.dest(paths.svgSprite.dest));
}

//Наблюдение за изменениями
function watch() {
  gulp.watch(paths.html.src, gulp.series(html, reload));
  gulp.watch(paths.fonts.src, gulp.series(fonts, reload));
  gulp.watch(paths.styles.watch, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.svgSprite.src, gulp.series(svgSprite, reload));
}

//Создание ветки gh-pages и загрузка туда содержимого папки dist
gulp.task('deploy', () => {
  return gulp.src('./dist/**/*').pipe(ghPages());
});

//Запуск сборки
gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(html, styles, scripts, stylesNlz, fonts, images, svgSprite)
  )
);

//Запуск сборки, сервера и слежения за файлами
gulp.task(
  'default',
  gulp.series(
    clean,
    gulp.parallel(html, styles, stylesNlz, scripts, fonts, images, svgSprite),
    gulp.parallel(serve, watch)
  )
);
