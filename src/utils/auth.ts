import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";

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


// export const getUserByIDToken = async (idToken:string) => {
//   const client = new OAuth2Client()
//   try {
//     let audience = [ iosClientId, androidClientId ];

//     if (idToken) {
//       const ticket = await client.verifyIdToken({
//         idToken,
//         audience: audience,
//       });
//       const data = ticket.getPayload();
//       return data;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error during Google Auth ID Token Verification: ", error);
//     return null;
//   }
// };

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