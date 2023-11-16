import { ActivityType, CourseType, LessonType, UnitType } from "../@types"
import Course from "../realm/schemas/Course"

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
    StartActivity: {
        lesson: LessonType
        activityType?: ActivityType | string
    }
    Activity: {
        lesson: LessonType
        activityType?: ActivityType | string
    }

}

export type DrawerStackParamList = {
    BottomNavigator: undefined
    AccountInfo: undefined
    Settings: {
        course: Course
    }
    Languages: undefined
}   

export type SettingsStackParamList = {
    Settings: undefined
    AccountInfo : undefined
    Home : undefined
}
