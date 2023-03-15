import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from 'expo-secure-store';
import Handlebars from "react-native-handlebars";

import {
  iosClientId,
  androidClientId,
  expoClientId,
  expoClientSecret,
} from "../config";

const GOOGLE_OAUTH_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";

// The redirect uri must contain the iOS bundle identifier or android package name.
const scheme =
  Platform.OS === "android"
    ? "com.languages7000.app://"
    : "com.7000languages.app://";

// Set the redirectUri - this is neccessary for AuthSession.exchangeCodeAsync();
export const redirectUri = AuthSession.makeRedirectUri({
  native: scheme,
  useProxy: true,
});

export const getClientIdAndClientSecret = () => {
  switch (Platform.OS) {
    case "ios":
      return {
        clientId: iosClientId,
      };
    case "android":
      return {
        clientId: androidClientId,
      };
    default:
      return {
        clientId: expoClientId,
        clientSecret: expoClientSecret,
      };
  }
};

export const exchangeAuthCode = async (
  code: string,
  clientId: string,
  clientSecret: string | undefined,
  codeVerifier: string
) =>
  AuthSession.exchangeCodeAsync(
    {
      code,
      clientId,
      clientSecret,
      redirectUri,
      extraParams: {
        code_verifier: codeVerifier,
      },
    },
    { tokenEndpoint: GOOGLE_OAUTH_TOKEN_URL }
  )
    .then(async (authentication) => {
      const { idToken, refreshToken } = authentication;
      if (idToken !== null && refreshToken !== null) {
        // id token has to be saved before api calls are made, the other save's can be async
        //   await saveUserIDToken(idToken)
        //   saveUserRefreshToken(refreshToken)

        return { success: true, message: "successfully saved", idToken };
      }
      return {
        success: false,
        message: `idToken or refreshToken is none, authentication result: ${authentication}`,
        idToken: undefined,
      };
    })
    .catch((reason) => ({
      success: false,
      message: `failed to save due to error: ${reason}`,
      idToken: undefined,
    })
);

export const getUserInfo = async (token:string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      return user;
    } catch (error) {
      // Add your own error handler here
    }
};


export const save = async (key: string, value: string) => {
  let testedValue = typeof value === "string" ? value : JSON.stringify(value)
  await SecureStore.setItemAsync(key, testedValue);
};

export const getValueFor = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return JSON.parse(result);
  } else {
    console.log("Error: Failed to get value for key: " + key);
  }
};