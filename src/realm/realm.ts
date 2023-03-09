import { createRealmContext } from '@realm/react'

import {
  users,
  completes,
  courses,
  coursedetails,
  lessons,
  units,
  vocabs
} from './schemas'

export const realmContext = createRealmContext({
  schema: [users, completes, courses, coursedetails, lessons, units, vocabs],
  schemaVersion: 1
})
