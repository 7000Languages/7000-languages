import { createRealmContext } from '@realm/react'

import {
  User,
  completes,
  courses,
  coursedetails,
  lessons,
  units,
  vocabs,
  Activity,
  ActivityLevel,
  WordMatch,
  DeletedFile,
  CourseFlag,
  UnitFlag,
  LessonFlag,
  JoinedCourse
} from './schemas'
import { CompletedLesson } from './schemas/JoinedCourse';
CompletedLesson

export const realmContext = createRealmContext({
  schema: [
    User,
    completes,
    courses,
    coursedetails,
    lessons,
    units,
    vocabs,
    Activity,
    ActivityLevel,
    WordMatch,
    DeletedFile,
    CourseFlag,
    UnitFlag,
    LessonFlag,
    JoinedCourse,
    CompletedLesson
  ],
  schemaVersion: 1,
});
