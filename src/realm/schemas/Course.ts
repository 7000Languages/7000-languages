import Realm, { BSON } from "realm";
import { CourseType } from "../../@types";
import CourseDetails from "./CourseDetails";

export default class Course extends Realm.Object<CourseType> {

  _id!: string
  approved!: boolean
  admin_id!: string
  details!: CourseDetails
  created_at?: Date
  updated_at?: Date

  static schema = {
    name: 'courses',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      approved: 'bool',
      admin_id: 'string',
      details: 'coursedetails',
      created_at: { type: "date?", default: new Date },
      updated_at: { type: "date?", default: new Date }
    },
  }
}
