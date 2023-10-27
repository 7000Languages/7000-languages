import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const save = async (key: string, value: string|object) => {
  let testedValue = typeof value === "string" ? value : JSON.stringify(value);
  await storage.set(key, testedValue)
};

export const getValueFor = (key: string) => {
  try {
    const jsonValue = storage.getString(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
};
