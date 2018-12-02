'use strict';

// Importing the required modules
const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  sourcemaps = require('gulp-sourcemaps'),
	  csso = require('gulp-csso'),
	  del = require('del'),
	  runSequence = require('run-sequence');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// Setting SASS compiler settings
var SassOptions = {
	outputStyle: 'expanded'
};

// The Gulp task for preparing CSS
gulp.task('sass', function() {
	return gulp.src('./sources/sass/**/*.+(scss|sass)')
		.pipe(sourcemaps.init())
		.pipe(sass(SassOptions).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 4 versions']}))
		.pipe(csso())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./assets/css'));
});

// Gulp task for cleaning the assets directory
gulp.task('clean', function() {
	return del.sync(['./assets', './dist']);
});

// The default Gulp task which first does a fresh build and watches for any changes
gulp.task('default', ['clean'], function() {
	runSequence('sass');

	gulp.watch('./sources/sass/**/*.+(scss|sass)', ['sass']);
	// gulp.watch('./sources/js/**/*.js', ['js-optimize']);
});