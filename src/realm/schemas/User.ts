import { BSON } from 'realm'

export default class User extends Realm.Object {

  _id!: string
  role!: number
  authID!: string
  name!: string;
  email!: string;
  phone!: string;
  avatar!: string;
  country?: string;
  city?: string;
  date_of_birth?: Date;
  adminLanguages!: string[]
  learnerLanguages!: string[]
  collaboratorLanguages!: string[]
  completedActivityLevels?: string[]
  completedLessons?: string[]
  created_at!: Date;
  updated_at!: Date;
  
  static schema = {
    name: 'users',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      role: 'int',
      authID: 'string?',
      name: "string?",
      email: "string?",
      phone: "string?",
      avatar: "string?",
      country: "string?",
      city: "string?",
      date_of_birth: { type: "date?", default: new Date },
      adminLanguages: { type: 'string[]', default: [] },
      learnerLanguages: { type: 'string[]', default: [] },
      collaboratorLanguages: { type: 'string[]', default: [] },
      completedActivityLevels: { type: 'string[]', default: []},
      created_at: { type: "date?", default: new Date },
      updated_at: { type: "date?", default: new Date },
    },
  }
}
