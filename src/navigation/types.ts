import { LessonType, UnitType } from "../@types"

export type RootStackParamList = {
    Splash: undefined
    DrawerNavigator: undefined
    Onboarding: undefined
    BottomNavigator: undefined
    Login: undefined
}

export type CourseStackParamList = {
    Home: undefined
    BecomeContributor: undefined
    ContributorCourse: undefined
    ContributorUnit: {
        item?: UnitType
    }
    ContributorLesson: {
        item?: LessonType
    }
}

export type DrawerStackParamList = {
    BottomNavigator: undefined
    AccountInfo: undefined
    Language: undefined
}

export type SettingsStackParamList = {
    Settings: undefined
}
