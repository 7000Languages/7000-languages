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
        setLearnerCourses: (state, action:PayloadAction<CourseType>) => {
            state.learnerCourses = [...state.learnerCourses, action.payload]
        },
        setAdminCourses: (state, action:PayloadAction<CourseType>) => {
            state.adminCourses = [...state.adminCourses, action.payload]
        }
    }
});

export const { setLearnerCourses, setAdminCourses } = coursesSlice.actions

export default coursesSlice.reducer