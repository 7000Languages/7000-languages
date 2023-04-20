import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { S3Client, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_NAME, S3_REGION, S3_SECRET_ACCESS_KEY, S3_ACCESS_KEY_ID } from '@env'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const bucketName = S3_BUCKET_NAME
const bucketRegion = S3_REGION
const accessKeyId = S3_ACCESS_KEY_ID
const secretAccessKey = S3_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId,
        secretAccessKey,
    },
    region: bucketRegion,
});

export const uploadFileToS3 = async (fileName: string, file: string, ContentType: string) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: {
        size: 33334,
        sourceURL:
          'file:///Users/macbook/Library/Developer/CoreSimulator/Devices/D78F8E9C-F36D-4820-81C6-176D9E314D7B/data/Media/DCIM/100APPLE/IMG_0008.JPG',
        width: 300,
      },
      ContentType,
    };
    const command = new PutObjectCommand(params)
    
    await s3.send(command).then(async(res) => {
        const getObjectParams = {
            Bucket: bucketName,
            Key: fileName,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3 as any, command as any,);        
        return {
            res,
            url
        }
    })
}

export const deleteFileFromS3 = async (fileName: string) => {
    const deleteObjectParams = {
        Bucket: bucketName,
        Key: fileName,
    }
    const command = new DeleteObjectCommand(deleteObjectParams);
    await s3.send(command).then((res) => {
        return res
    })
}