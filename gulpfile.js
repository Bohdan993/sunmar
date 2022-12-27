import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import  gulp from 'gulp';
const {
    src,
    dest,
    parallel,
    series
} = gulp;
import  less from 'gulp-less';
import  minifyCSS from 'gulp-clean-css';
import  postcss from 'gulp-postcss';
import  prefixer from 'autoprefixer';
import  conct from 'gulp-concat';
import  del from 'del';
import  pugToHtml from 'gulp-pug';
import  browserSync from 'browser-sync';
browserSync.create();
import  sourcemap from 'gulp-sourcemaps';
// import  img from 'gulp-imagemin');
// import  imageminMozjpeg from 'imagemin-mozjpeg');
import  image from 'gulp-image';
import  rename from 'gulp-rename';
import  plumber from 'gulp-plumber';
import  changed from 'gulp-changed';
import  svgSprite from 'gulp-svg-sprite';
import  svgmin from 'gulp-svgmin';
import  cheerio from 'gulp-cheerio';
import  replace from 'gulp-replace';
import  spritesmith from 'gulp.spritesmith';
import  webpack from 'webpack-stream';
import  log from 'fancy-log';
import  critical from 'critical';

critical.stream;




let isDev = false;
let isProd = !isDev;

let webConfig = {
    entry: {
        'index': './app/js/index.min.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, ],
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-cheap-source-map' : false,
    externals: {
        moment: 'moment'
    }
};

let webConfig2 = {
    output: {
        filename: 'libs.min.js'
    },
    mode: isDev ? 'development' : 'production',
    //  externals: {
    //     moment: 'moment'
    // }
};



var plugin = [
    prefixer({
        overrideBrowserslist: ['> 0.01%']
    })

];


// function compress() {
//     return src('./app/testimg/**/*.*')

//         .pipe(img({
//                 progressive: true,
//                 use: [imageminMozjpeg({
//                         quality: 70
//                     }),
//                     pngquant()
//                 ],
//                 interlaced: true
//             }

//         ))

//         .pipe(dest('./dist/testimg'));

// }




function fonts() {
    return src('./app/fonts/**/*')
        .pipe(dest('./dist/fonts'))
        .pipe(browserSync.stream());;

}



function css() {
    return src(['./app/less/**/main.less', './app/less/**/index.less'])
        .pipe(changed('./dist/css/', {
            extension: '.css',
            hasChanged: changed.compareContents
        }))
        .pipe(sourcemap.init())
        // .pipe(conct('style.min.less'))
        .pipe(less({
            
        }))
        .pipe(minifyCSS({
            level: 2
        }))
        .pipe(postcss(plugin))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemap.write('./maps'))

        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}


function scripts() {
    return src('./app/js/main.js', {
            allowEmpty: true
        })
        .pipe(changed('./dist/js', {
            extension: '.js',
            hasChanged: changed.compareContents
        }))
        .pipe(plumber())
        .pipe(webpack(webConfig))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());

}

function libs() {
    return src('./app/libs/libs.js')
        .pipe(plumber())
        .pipe(webpack(webConfig2))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());

}


function libsCSS() {
    return src('./app/libsCSS/**/*.less')
        .pipe(sourcemap.init())
        .pipe(conct('libs.less'))
        .pipe(less())
        .pipe(minifyCSS({
            level: 2
        }))
        .pipe(postcss(plugin))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemap.write('./maps'))

        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());

}


// function images() {
//     return src('./app/img/**/*.*')

//         .pipe(img(

//             [
//                 imageminMozjpeg({
//                     quality: 70
//                 })
//             ]

//         ))

//         .pipe(dest('./dist/img'))
//         .pipe(browserSync.stream());

// }


function images() {
    return src('./app/img/**/*.*')

        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true // defaults to false
        }))

        .pipe(dest('./dist/img'))
        .pipe(browserSync.stream());
}


function sprites() {
    return src('./app/img/sprites/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                // $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(dest('./dist/img/sprites/svg'))
        .pipe(browserSync.stream());
}




function spritesPNG() {
    var spriteData = src('./app/img/sprites/png/*.png') // путь, откуда берем картинки для спрайта
        .pipe(plumber()) // plumber
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.less',
            cssFormat: 'less',
            algorithm: 'binary-tree',
            cssTemplate: './app/less/less.template.handlebars',
            cssVarMap: function (sprite) {
                sprite.name = 's-' + sprite.name
            }
        }));

    spriteData.img.pipe(dest('./dist/img/sprites/png')); // путь, куда сохраняем картинку
    spriteData.css.pipe(dest('./app/less')) // путь, куда сохраняем стили
        .pipe(browserSync.stream());
}




function pug() {
    return src('./app/*.pug')
        .pipe(changed('./dist', {
            extension: '.html',
            hasChanged: changed.compareContents
        }))
        .pipe(plumber()) // plumber
        .pipe(pugToHtml({
            pretty: true,
            basedir: '/'
        }))
        .pipe(rename({
            dirname: ''
        }))

        .pipe(dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
}



function criticalCss() {
    return src('dist/index.html')
        .pipe(critical({
            base: 'dist/',
            inline: false,
            css: ['dist/css/libs.min.css', 'dist/css/main.min.css']
        }))
        .on('error', function (err) {
            log.error(err.message);
        })
        .pipe(dest('dist/css/critical.css'));
}




function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false
    });
    gulp.watch('./app/less/**/*.less', css);
    gulp.watch('./app/js/**/*.js', scripts);
    gulp.watch('./app/libs/**/*.js', libs);
    gulp.watch(['./app/img/**/*', '!./app/img/sprites/**/*'], images);
    gulp.watch('./app/img/sprites/svg/*.svg', sprites);
    gulp.watch('./app/img/sprites/png/*.png', spritesPNG);
    gulp.watch('./app/libsCSS/**/*.less', libsCSS);
    gulp.watch('./app/fonts/**/*', fonts);
    gulp.watch('./app/**/*.pug', pug);
    gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
}

function clean() {
    return del(['dist/*', '!dist/*.html']);
}

function build (){
    return series(clean, parallel(watch, css, scripts, images, libs, fonts, libsCSS, pug, sprites, spritesPNG, criticalCss))
}

export {
    css,
    scripts,
    libsCSS,
    libs,
    images,
    fonts,
    pug,
    sprites,
    spritesPNG,
    criticalCss,
    watch,
    clean,
    build
}
