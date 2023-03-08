import { createRealmContext } from '@realm/react'

import {
  User,
  Complete,
  Course,
  CourseDetails,
  Lesson,
  Unit,
  Vocab,
} from './schemas'

export const realmContext = createRealmContext({
  schema: [User, Complete, Course, CourseDetails, Lesson, Unit, Vocab],
  schemaVersion: 1
})
