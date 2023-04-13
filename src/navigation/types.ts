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
        course_id: string
    }
    ContributorUnit: {
        unit_id: string
    }
    ContributorLesson: {
        lesson_id: string
    }
    Search: undefined
    LearnerCourse: {
        course_id: string
    }
    LearnerUnit: {
        unit_id: string
    }
    LearnerLesson: {
        lesson_id: string
    }
    StartActivity: undefined
    Activity: undefined

}

export type DrawerStackParamList = {
    BottomNavigator: undefined
    AccountInfo: undefined
    Language: undefined
}

export type SettingsStackParamList = {
    Settings: undefined
}
