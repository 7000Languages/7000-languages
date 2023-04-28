import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { S3Client, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_NAME, S3_REGION, S3_SECRET_ACCESS_KEY, S3_ACCESS_KEY_ID } from '@env'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import S3 from 'aws-sdk/clients/s3';

const bucketName = S3_BUCKET_NAME
const bucketRegion = S3_REGION
const accessKeyId = S3_ACCESS_KEY_ID
const secretAccessKey = S3_SECRET_ACCESS_KEY

// const s3 = new S3Client({
//     credentials:{
//         accessKeyId,
//         secretAccessKey,
//     },
//     region: bucketRegion,
// });

const s3 = new S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: bucketRegion,
    // signatureVersion: 'v4',
});

export const uploadFileToS3 = (fileName: string, contents: string | object, ContentType: string) => (new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: contents,
    };
    s3.upload(uploadParams, (err: any) => {
      if (err) reject(err);
      resolve(true);
    });
}));

// export const uploadFileToS3 = async (fileName: string, contents: string | object, ContentType: string) => {
//     const params = {
//       Bucket: bucketName,
//       Key: fileName,
//       Body: contents,
//       ContentType,
//     };
//     const command = new PutObjectCommand(params)
//     await s3.send(command);
//     // await s3.send(command).then(async(res) => {
//     //     const getObjectParams = {
//     //         Bucket: bucketName,
//     //         Key: fileName,
//     //     }
//     //     const command = new GetObjectCommand(getObjectParams);
//     //     const url = await getSignedUrl(s3 as any, command as any,);        
//     //     return {
//     //         res,
//     //         url
//     //     }
//     // })
// }

// export const deleteFileFromS3 = async (fileName: string) => {
//     const deleteObjectParams = {
//         Bucket: bucketName,
//         Key: fileName,
//     }
//     const command = new DeleteObjectCommand(deleteObjectParams);
//     await s3.send(command).then((res) => {
//         return res
//     })
// }