"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html', //'glob' is a regex-y definition --- here, go into the src path and find anything that ends in .html
		js: './src/**/*.js', // '**' look in subdirectories for any js
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
					'node_modules/toastr/build/toastr.min.css'
    ],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() { //task defined name, then function
	connect.server({ //define the name method 'server'
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() { //name, dependency (first, run this task then...), function
	gulp.src('dist/index.html') //use src method and .pipe() that with the 'open' object
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});
//html task
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});
//js task
gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify) //transform jsx
		.bundle() //bundle it all into one file
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js')) //name the bundled file
		.pipe(gulp.dest(config.paths.dist + '/scripts')) //set the destination to dist/scripts
		.pipe(connect.reload());
});
//css task
gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});
//images task
gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
	//favicon
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});
//linting task
gulp.task('lint', function() {
	return gulp.src(config.paths.js) //return the output
		.pipe(lint({config: 'eslint.config.json'})) //'rules / config' file
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']); //anything changes here, rerun the 'html' task
	gulp.watch(config.paths.js, ['js', 'lint']);
});

//gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']); //these are all the dfault tasks that run by default
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']); //these are all the dfault tasks that run by default
