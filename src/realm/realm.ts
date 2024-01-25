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
  CourseFlag

  
} from './schemas'

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
    CourseFlag
  ],
  schemaVersion: 1,
});
