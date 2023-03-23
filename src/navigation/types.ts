import { CourseType, LessonType, UnitType } from "../@types"

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
    ContributorCourse: {
        course: CourseType
    }
    ContributorUnit: {
        unit: UnitType
        lessons: LessonType[]
    }
    ContributorLesson: {
        lesson: LessonType
    }
    Search: undefined
}

export type DrawerStackParamList = {
    BottomNavigator: undefined
    AccountInfo: undefined
    Language: undefined
}

export type SettingsStackParamList = {
    Settings: undefined
}
