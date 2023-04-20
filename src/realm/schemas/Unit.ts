import Realm, { BSON } from "realm";

export default class Unit extends Realm.Object {

  _id!: string
  _course_id!: string
  name!: string
  _order!: number
  selected!: boolean
  description!: string
  image!: string

  static schema = {
    name: 'units',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      _course_id: "string",
      name: "string",
      _order: "int",
      selected: "bool",
      description: { type: "string?", default: '' },
      image: { type: "string?", default: '' },
    },
  }
}