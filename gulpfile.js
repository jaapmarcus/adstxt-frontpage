/* 
 * ----- PROJECT REQUIREMENTS -----
 *
 */
var gulp = require("gulp");
var sass = require('gulp-dart-sass');
var postcss = require("gulp-postcss");
var cleancss = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var del  = require("del");
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');



/* 
 * ----- PROJECT SETTINGS -----
 *
 */
var sourcePrefix = './source',
    public       = './public',
    buildPrefix  = public + '/assets/build';

var paths = {
	js: {
		watch: [
			// Project scripts
			sourcePrefix + '/js/*.js', sourcePrefix + '/js/**/*.js'
		],
		dest: buildPrefix + '/js',
		output: 'main.js',
	},
	css: {
		watch: [
			// Project styles
			sourcePrefix + '/sass/*.scss', sourcePrefix + '/sass/**/*.scss'
		],
		dest: buildPrefix + '/css'
	}
};



/* 
 * ----- LOCAL WEBSERVER TASKS -----
 *
 */
var server = function() {
  connect.server({
    root: public,
    livereload: true
  });
};
server.description = 'Run a local webserver with LiveReload';



/* 
 * ----- CLEAN TASKS -----
 *
 */
var cleanCss = function() {
	return del(paths.css.dest);
};
cleanCss.description = 'Clean all styles';

var cleanJs = function() {
	return del(paths.js.dest);
};
cleanJs.description = 'Clean all scripts';



/* 
 * ----- COMPILE TASKS -----
 *
 */
var compileCss = function() {
	return gulp.src(paths.css.watch)
		.pipe(sass({indentType: 'tab', indentWidth: 1, outputStyle: 'expanded'}))
		.pipe(postcss([autoprefixer]))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(cleancss({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(connect.reload());
};
compileCss.description = 'Compile (minified) styles';

var compileJs = function() {
    return gulp.src(paths.js.watch)
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish))
	    .pipe(concat(paths.js.output))
	    .pipe(gulp.dest(paths.js.dest))
	    .pipe(uglify())
	    .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest(paths.js.dest))
	    .pipe(connect.reload());
};
compileJs.description = 'Compile (minified) scripts';



/* 
 * ----- BUILD TASKS (clean, than compile) -----
 *
 */
var buildCss = gulp.series(cleanCss, compileCss);
buildCss.description = 'Build styles';

var buildJs = gulp.series(cleanJs, compileJs);
buildJs.description = 'Build scripts';

var build = gulp.parallel(buildCss, buildJs);
build.description = "Build all";



/* 
 * ----- WATCH TASKS -----
 *
 */
var watchCss = function() {
	gulp.watch(paths.css.watch, buildCss);	
};
watchCss.description = 'Watch styles';

var watchJs = function() {
	gulp.watch(paths.js.watch, buildJs);
};
watchJs.description = 'Watch scripts';

var watch = gulp.parallel(
	server,
	gulp.series(buildCss, watchCss),
	gulp.series(buildJs, watchJs)
);
watch.description = 'Watch styles and scripts';



/* 
 * ----- DEFAULT TASK -----
 *
 */
var defaultTask = gulp.series(build);



/* 
 * ----- EXPORT TASKS -----
 *
 */
module.exports = { 
	cleanCss: cleanCss,
	cleanJs: cleanJs,
	compileCss: compileCss,
	compileJs: compileJs,
	buildCss: buildCss,
	buildJs: buildJs,
	build: build,
	watchCss: watchCss,
	watchJs: watchJs,
	watch: watch,
	server: server,
	default: defaultTask
};
