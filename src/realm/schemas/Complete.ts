import Realm, { BSON } from "realm";

export default class Complete extends Realm.Object {
  _id!: String
  user_id!: string
  _course_id!: string
  _lesson_id!: string

  static schema = {
    name: 'Complete',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      user_id: 'string',
      _course_id: 'string',
      _unit_id: 'string',
      _lesson_id: 'string',
    },
  }
}
