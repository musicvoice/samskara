'use strict';

// Importing the required modules
const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  sourcemaps = require('gulp-sourcemaps'),
	  csso = require('gulp-csso');

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