import { BSON } from 'realm'

export default class User extends Realm.Object {

  _id!: string
  role!: number
  authID!: string
  adminLanguages!: string[]
  learnerLanguages!: string[]
  collaboratorLanguages!: string[]

  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      role: 'int',
      authID: 'string?',
      adminLanguages: { type: 'string[]', default: [] },
      learnerLanguages: { type: 'string[]', default: [] },
      collaboratorLanguages: { type: 'string[]', default: [] },
    },
  }
}
