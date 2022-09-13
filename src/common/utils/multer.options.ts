import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
  region: process.env.AWS_S3_REGION,
});

const createFolder = (folder: string) => {
  try {
    console.log('create a root upload folder');
    fs.mkdirSync(path.join(__dirname, '..', 'upload'));
  } catch (error) {
    console.log('the folder already exists...');
  }
  try {
    console.log(`create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `upload/${folder}`));
  } catch (error) {
    console.log(`the ${folder} folder already exists..`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, callback) {
      const folderName = path.join(__dirname, '..', `upload/${folder}`);
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

export const multerS3Options = (folder: string) => {
  const result: MulterOptions = {
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: function (request, file, cb) {
        const ext = path.extname(file.originalname);
        const folderName = `upload/${folder}`;
        const fileName = `${path.basename(
          file.originalname,
          ext,
        )}${Date.now()}${ext}`;
        cb(null, `${folderName}/${fileName}`);
      },
    }),
  };
  return result;
};
