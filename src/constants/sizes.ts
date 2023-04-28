import { Dimensions, Platform, StatusBar } from "react-native"

const { width, height } = Dimensions.get('screen');

export const DEVICE_WIDTH = width
export const DEVICE_HEIGHT = height
export const StatusBarHeight = Platform.OS == 'android' ? StatusBar.currentHeight : 10