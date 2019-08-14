import * as gulp from 'gulp';

import {json2php} from './src/index';

gulp.src('./test/hash-map.json')
.pipe(json2php({funName: 'polyfillMap'}))
.pipe(gulp.dest('js2php'));