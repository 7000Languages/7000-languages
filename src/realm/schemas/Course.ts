import Realm, { BSON } from "realm";
import { CourseType } from "../../@types";

export default class Course extends Realm.Object<CourseType> {

  _id!: string
  approved!: boolean
  admin_id!: string
  details!: object

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
