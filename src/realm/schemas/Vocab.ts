import Realm, {BSON} from 'realm';

export default class Vocab extends Realm.Object {
  _id!: string;
  _user_id!: string
  _course_id?: string
  _unit_id?: string
  _lesson_id?: string
  _order!: number;
  original!: string;
  translation!: string;
  image!: string;
  audio!: string;
  local_image_path!: string;
  local_audio_path!: string;
  local_image_uploaded!: boolean;
  local_audio_uploaded!: boolean;
  image_metadata!: {
    fileName: string;
    fileSize: number;
    height: number;
    type: string;
    width: number;
  };
  audio_metadata!: {
    fileName: string;
    fileSize: number;
    type: string;
  };
  selected!: boolean;
  notes!: string;
  hidden!: boolean;
  activities?: string[];
  created_at?: Date
  updated_at?: Date

  static schema = {
    name: 'vocabs',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _user_id: { type: 'string', default: '' },
      _course_id: { type: 'string?', default: ''},
      _lesson_id: { type: 'string?', default: ''},
      _unit_id: { type: 'string?', default: ''},
      _order: 'int',
      original: 'string',
      translation: 'string',
      image: {type: 'string', default: ''},
      audio: {type: 'string', default: ''},
      local_image_path: {type: 'string', default: ''},
      local_audio_path: {type: 'string', default: ''},
      local_image_uploaded: {type: 'bool', default: false},
      local_audio_uploaded: {type: 'bool', default: false},
      image_metadata: '{}',
      audio_metadata: '{}',
      selected: {type: 'bool', default: true},
      notes: {type: 'string', default: ''},
      hidden: {type: 'bool', default: false},
      activities: { type: 'string[]', default: [] },
      created_at: { type: "date", default: new Date() },
      updated_at: { type: "date", default: new Date() }
    },
  };
}
