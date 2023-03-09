import Realm, { BSON } from 'realm'

export default class Vocab extends Realm.Object {

  _id!: string
  _order!: number
  original!: string
  translation!: string
  image!: string
  audio!: string
  selected!: boolean
  notes!: string

  static schema = {
    name: 'vocabs',
    primaryKey: '_id',
    properties: {
      _id: { type: 'objectId', default: () => new BSON.ObjectId() },
      _order: 'int',
      original: 'string',
      translation: 'string',
      image: { type: 'string', default: '' },
      audio: { type: 'string', default: '' },
      selected: { type: 'bool', default: true },
      notes: { type: 'string', default: '' },
    },
  }
}
