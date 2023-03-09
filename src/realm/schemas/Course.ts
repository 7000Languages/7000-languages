import Realm, { BSON } from "realm";

export default class Course extends Realm.Object {

  _id!: string
  approved!: boolean
  admin_id!: string
  details!: string

  static schema = {
    name: 'courses',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      approved: 'bool',
      admin_id: 'string',
      details: 'coursedetails',
    },
  }
}
