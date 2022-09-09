import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('create a root uploads folder');
    fs.mkdirSync(path.join(__dirname, '..', 'upload'));
  } catch (error) {
    console.log('the folder already exists...');
  }
  try {
    console.log('create a ${folder} uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`the ${folder} folder already exists..`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, callback) {
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      callback(null, folderName);
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      callback(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
