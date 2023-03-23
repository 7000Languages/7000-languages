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

            // convert the realm objects to plain objects. TODO: Look for a better solution as this is expensive
            let courses = [...action.payload.map(course=>(Object.assign({}, JSON.parse(JSON.stringify((course))))))]
            state.adminCourses = courses
        }
    }
});

export const { setLearnerCourses, setAdminCourses } = coursesSlice.actions

export default coursesSlice.reducer