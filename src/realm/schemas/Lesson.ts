import Realm, { BSON } from 'realm'

export default class Lesson extends Realm.Object {

  _id!: string
  _course_id!: string
  _unit_id!: string
  name!: string
  _order!: number
  selected!: boolean
  vocab!: []
  description!: string

  static schema = {
    name: 'Lesson',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      _course_id: 'string',
      _unit_id: 'string',
      name: 'string',
      _order: 'int',
      selected: 'bool',
      vocab: { type: 'Vocab[]', default: [] },
      description: { type: 'string?', default: '' },
    },
  }
}
