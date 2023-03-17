import * as SecureStore from 'expo-secure-store';

export const save = async (key: string, value: string) => {
  let testedValue = typeof value === "string" ? value : JSON.stringify(value);
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
