'use strict';
var notify = require('gulp-notify');

module.exports = function(title, detailMessageFn) {
  return function(error) {
   notify.onError({title: title, message: detailMessageFn(error), sound: "Sosumi"})(error); //Error Notification
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
  }
}
