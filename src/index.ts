import * as gutil from 'gulp-util';
import * as through from 'through2';
import {File} from 'gulp-util';
import replaceExt = require('replace-ext');
const Json2php = require('json2php');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-json2php';

export function json2php(param: any) {
  return through.obj(function(file:File, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported!'));
      return cb();
    }
  
    if (file.isBuffer()) {
      let contents = file.contents.toString();
      contents = JSON.parse(contents);
      contents = Json2php(contents);
      let {funName = 'map'} = param;
      let string = "<?php " + "\n"
      + " function " + funName + " () { " + "\n"
      + "return $map= " + "" + contents + ";" + "\n"
      + "}" + "\n"
      + "return " + funName + ";" + "\n"
      + "?>"
      file.contents = Buffer.from(string);
      file.path = replaceExt(file.path, '.php');
    }
    this.push(file);
    cb();
  })
}
