#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import getFormat from './parsers.js';
import compareFiles from './compareFiles.js';
import formatter from './formatter/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync((getPath(filepath)), 'utf-8');
const format = (data) => path.extname(data);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const format1 = format(filepath1);
  const format2 = format(filepath2);
  const file1parse = getFormat(file1, format1);
  const file2parse = getFormat(file2, format2);
  const compare = compareFiles(file1parse, file2parse);
  return formatter(compare, formatName);
};

export default genDiff;
