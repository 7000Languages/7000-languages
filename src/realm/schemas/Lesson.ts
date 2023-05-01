import Realm, {BSON} from 'realm';

export default class Lesson extends Realm.Object {
  _id!: string;
  _course_id!: string;
  _unit_id!: string;
  name!: string;
  _order!: number;
  selected!: boolean;
  vocab!: [];
  description!: string;
  image!: string;
  hidden!: boolean;

  static schema = {
    name: 'lessons',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _course_id: 'string',
      _unit_id: 'string',
      name: 'string',
      _order: 'int',
      selected: 'bool',
      vocab: {type: 'vocabs[]', default: []},
      description: {type: 'string?', default: ''},
      image: {type: 'string?', default: ''},
      hidden: {type: 'bool', default: false}
    },
  };
}
