import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";

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