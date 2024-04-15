import RNFS from "react-native-fs"
import { PermissionsAndroid, Platform } from "react-native";
import { ActivityLevelType } from "../@types";

/**
 * This function is responsible for taking in an array 
 * of Realm objects and returning and array of plain Object objects.
 * This is so that we can use TypeScript types on the objects and also avoid invalidation of objects
 * 
 * @param data This is an array of Realm objects
 * @returns an array of Plain objects
 */
export const convertToArrayOfPlainObject = (data: Realm.Object[] | string[]) => {
    return [
      ...data.map((course) =>
        Object.assign({}, JSON.parse(JSON.stringify(course)))
      ),
    ];
}

export const convertToPlainObject = (data: Realm.Object | object | string) => {
    if(typeof data === 'string') {
      return Object.assign({}, JSON.parse(data))
    }
    return Object.assign({}, JSON.parse(JSON.stringify(data)));
}

export const hasEmoji = (text: string): boolean => {
  const regex_emoji =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
  return regex_emoji.test(text);
};


export const formatAudioDuration = (seconds: number): string => {
  let calMinutes = Math.floor(seconds / 60);
  let calSeconds = Math.round(seconds - calMinutes * 60);
  return `${calMinutes > 9 ? calMinutes : `0${calMinutes}`} : ${
    calSeconds > 9 ? calSeconds : `0${calSeconds}`
  }`;
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log("Camera permission given");
    } else {
      //console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestAudioRecordPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);  
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        //console.log('Permissions granted');
      } else {
        //console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}

export const deleteLocalFile = async (path: string) => {
  RNFS.unlink(path)
  .then(() => {
    console.log('FILE DELETED');
  })
  // `unlink` will throw an error, if the item to unlink does not exist
  .catch((err) => {
    //console.log(err.message);
  });
}

export const randomisedArray = (array: any[]) => {
  return array.sort(()=> 0.5 - Math.random());
}