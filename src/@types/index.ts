export type UserType = {
    _id: string
    role: number
    authID: string
    adminLanguages: string[]
    learnerLanguages: string[]
    collaboratorLanguages: string[]
}

export type CourseType = {
    _id: string
    approved: boolean
    admin_id: string
    details: CourseDetailsType
}

export type CourseDetailsType = {
    admin_name: string
    admin_email: string
    name: string
    alternative_name: string
    description: string
    translated_language: string
    population: number
    location: number
    link: string
    is_private: boolean
    code: number
}

export type UnitType = {
    _id: string
    _course_id: string
    name: string
    _order: number
    selected: boolean
    description: string
}

export type VocabType = {
    _id: string
    _order: number
    original: string,
    translation: string,
    image: string,
    audio: string,
    selected: boolean,
    notes: string
}

export type LessonType = {
    _id: string
    _course_id: string,
    _unit_id: string,
    name: string,
    _order: number,
    selected: boolean,
    vocab: VocabType[],
    description: string
}

export type CompleteType = {
    _id: string
    user_id: string
    _course_id: string
    _unit_id: string
    _lesson_id: string
}