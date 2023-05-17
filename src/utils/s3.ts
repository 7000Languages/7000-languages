import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import {XhrHttpHandler} from '@aws-sdk/xhr-http-handler';

import {
  S3_BUCKET_NAME,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
  S3_ACCESS_KEY_ID,
} from '@env';

const bucketName = S3_BUCKET_NAME;
const bucketRegion = S3_REGION;
const accessKeyId = S3_ACCESS_KEY_ID;
const secretAccessKey = S3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
  requestHandler: new XhrHttpHandler({}),
});


export const uploadFileToS3 = async (fileName: string, contents: object, ContentType: string) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: contents,
      ContentType,
    };
    const command = new PutObjectCommand(params)

    return await s3.send(command)
}

export const deleteFileFromS3 = async (fileName: string) => {
  const deleteObjectParams = {
    Bucket: bucketName,
    Key: fileName,
  };
  const command = new DeleteObjectCommand(deleteObjectParams);
  await s3.send(command).then(res => {
    return res;
  });
};
