import RNFS from 'react-native-fs';
import { store } from '../redux/store';
import { getFileFromS3 } from './s3';

export const readingImageFile = async (imageFile: string) => {
    const data = getFileFromS3(imageFile)
    //console.log(JSON.stringify(data))
}