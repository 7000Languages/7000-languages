import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "../../@types";

interface CoursesState {
    learnerCourses: CourseType[]
    adminCourses: CourseType[]
}

const initialState: CoursesState = {
    learnerCourses: [],
    adminCourses: []
}

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setLearnerCourses: (state, action:PayloadAction<CourseType[]>) => {
            let courses = [...action.payload]
            state.learnerCourses = courses
        },
        setAdminCourses: (state, action:PayloadAction<CourseType[]>) => {
            let courses = [...action.payload]
            state.adminCourses = courses
        }
    }
});

export const { setLearnerCourses, setAdminCourses } = coursesSlice.actions

export default coursesSlice.reducer