'use strict';

var gulp = require('gulp');
var projectConfig = require(process.cwd() + '/project.config.js')();
var $ = require('gulp-load-plugins')({lazy: true});
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;<% if(!prompts.notify) {%>
var chalk = require('chalk');<% } %><% if(prompts.styleSourcemaps) {%>
var sourcemaps = require('gulp-sourcemaps');<% } %><% if(prompts.autoPrefixr) {%>
var autoprefixer = require('gulp-autoprefixer');<% } %><% if(prompts.notify) {%>
var plumber = require('gulp-plumber');
var errorAlert = require(process.cwd()+'/tasks/notifyErrorHandler.js')("LESS Error", function(error) {
    var filePath = path.parse(error.filename);
    var srcDir = filePath;
    while (srcDir.base !== projectConfig.path.assetsDir) {
      srcDir = path.parse(path.relative('..',srcDir.dir));
    }
    var errorText = "File: " +srcDir.dir + filePath.base+":"+error.line+":"+error.column + "\nError: " + error.extract;;
    return errorText;
})
<% } %>

/**
 * LESS
 * Generates a new css file from our less files
 */
gulp.task('less', function () {

  var mainLessFile = path.join(projectConfig.path.srcDir, projectConfig.path.assets.lessMain);
  var mainCssDir = path.join(projectConfig.path.srcDir, projectConfig.path.assets.cssDir);

  var cssFile = projectConfig.pkg.name + '.css';

  return gulp
    .src(mainLessFile)<% if(prompts.styleSourcemaps) {%>
    .pipe(sourcemaps.init()) <% } %><% if(prompts.notify) {%>
    .pipe(plumber({errorHandler: errorAlert}))<% } %>
    .pipe($.less({
      paths: [path.join(__dirname, 'less', 'includes')]
    })<% if(!prompts.notify) {%>
      .on('error', function (err) {
        console.log('');
        console.log(chalk.red('X ') + 'LESS - ' + err.message);
        console.log('');
        this.emit('end');
      })<% } %>)<% if(prompts.autoPrefixr) {%>
    .pipe(autoprefixer({
            browsers: projectConfig.autoprefixer.browsers,
            cascade: false,
            remove: projectConfig.autoprefixer.remove
    }))<% } %><% if(prompts.styleSourcemaps) {%>
    .pipe(sourcemaps.write()) <% } %>
    .pipe($.rename(cssFile))
    .pipe(gulp.dest(mainCssDir))
    .pipe(reload({stream: true}));

});
