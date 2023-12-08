
/**
 * Contains information for 
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html
 */

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

import * as AWS from 'aws-sdk';
import { S3_ACCESS_KEY_ID, S3_BUCKET_NAME, S3_REGION, S3_SECRET_ACCESS_KEY } from '@env';


const bucketName = S3_BUCKET_NAME;
const bucketRegion = S3_REGION;
const accessKeyId = S3_ACCESS_KEY_ID;
const secretAccessKey = S3_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  correctClockSkew: true
 });

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
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

export const getFileFromS3 = async (filePath: string) => {
  const params = {
    Bucket: bucketName,
    Key: filePath,
  };
  const command = new GetObjectCommand(params);
  const response = await s3.send(command);
  return response
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
