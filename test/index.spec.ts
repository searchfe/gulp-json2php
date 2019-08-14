import * as gulp from 'gulp';
import {json2php} from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

gulp.src('./test/hash-map.json')
.pipe(json2php({funName: 'polyfillMap'}))
.pipe(gulp.dest('./test/json2php'));

describe('test gulp-json2php', () => {
    test('测试是否添加成功', () => {
        fs.readFile(path.resolve('./test/json2php/hash-map.php'), (err: any, file: any) => {
            if (err) {
              expect(file).toBeUndefined();
            }
            if (file) {
                const distContent = file.toString();
                expect(distContent.trim()).toMatch('<?php');
            }
        })
        
    });
});