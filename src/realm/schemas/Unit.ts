import Realm, {BSON} from 'realm';

export default class Unit extends Realm.Object {
  _id!: string;
  _course_id!: string;
  _user_id!: string
  name!: string;
  _order!: number;
  selected!: boolean;
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
    name: 'units',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _user_id: { type: 'string?', default: '' },
      _course_id: 'string',
      name: 'string',
      _order: 'int',
      selected: 'bool',
      description: {type: 'string?', default: ''},
      image: {type: 'string?', default: ''},
      local_image_path: {type: 'string?', default: ''},
      local_image_uploaded: {type: 'bool?', default: false},
      image_metadata: '{}',
      hidden: {type: 'bool?', default: false},
      created_at: { type: "date?", default: new Date },
      updated_at: { type: "date?", default: new Date }
    },
  };
}
