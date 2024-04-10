import Realm, {BSON, Object} from 'realm';

export default class Lesson extends Object {
  _id!: string;
  _course_id!: string;
  _unit_id!: string;
  _user_id!: string
  name!: string;
  _order!: number;
  selected!: boolean;
  vocab!: [];
  description!: string;
  image!: string;
  local_image_path!: string;
  local_image_uploaded!: boolean;
  image_metadata!: {
    fileName: string;
    fileSize: number;
    height: number;
    type: string;
    width: number;
  };
  hidden!: boolean;
  created_at?: Date
  updated_at?: Date

  static schema = {
    name: 'lessons',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _user_id: { type: 'string', default: '' },
      _course_id: 'string',
      _unit_id: 'string',
      name: 'string',
      _order: 'int',
      selected: 'bool',
      vocab: {type: 'vocabs[]', default: []},
      description: {type: 'string?', default: ''},
      image: {type: 'string?', default: ''},
      local_image_path: {type: 'string?', default: ''},
      local_image_uploaded: {type: 'bool', default: false},
      image_metadata: '{}',
      hidden: {type: 'bool', default: false},
      created_at: { type: "date", default: new Date() },
      updated_at: { type: "date", default: new Date() }
    },
  };
}
