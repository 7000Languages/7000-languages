import { Dimensions, StatusBar } from "react-native"

const { width, height } = Dimensions.get('screen');

export const DEVICE_WIDTH = width
export const DEVICE_HEIGHT = height
export const StatusBarHeight = StatusBar.currentHeight