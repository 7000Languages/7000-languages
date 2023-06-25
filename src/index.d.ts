declare module "react-native-handlebars"
declare module "react-native-url-polyfill/auto"
declare module '@env' {
    export const S3_ACCESS_KEY_ID: string;
    export const S3_SECRET_ACCESS_KEY: string;
    export const S3_BUCKET_NAME: string;
    export const S3_REGION: string;
    export const IOS_CLIENT_ID: string;
    export const ANDROID_CLIENT_ID: string;
    export const EXPO_CLIENT_ID: string;
    export const EXPO_CLIENT_SECRET: string;
    export const REALM_APP_IOS_ID: string;
    export const REALM_APP_ANDROID_ID: string;
    export const GOOGLE_SERVICES_CLIENT_ID: string;
}