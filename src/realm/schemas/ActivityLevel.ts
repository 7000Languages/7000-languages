import {BSON} from 'realm';

export default class ActivityLevel extends Realm.Object {
  _id!: BSON.ObjectId;
  _activity_id!: string;
  _course_id?: string;
  _lesson_id!: string;
  _vocab_id?: string;
  _order?: number;

  audio_for_texts!: {audio: string; correct_text_option: string};
  text_options!: string[];

  text_for_audios!: {text: string, correct_audio_option: string}
  audio_options!: string[];

  text_for_images!: {text: string, correct_image_option: string};
  image_options!: string[];

  audio_for_images!: {text: string, correct_image_option: string};
  image_options_for_audio!: {type: 'string[]', default: []};

  words_to_match!: {original: string; translation: string}[];
  vocabs_used_to_generate?: string[]

  static schema = {
    name: 'activityLevels',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _activity_id: 'string',
      _course_id: 'string?',
      _lesson_id: 'string',
      _vocab_id: 'string?',
      _order: 'int?',

      audio_for_texts: '{}',
      text_options: {type: 'string[]', default: []},

      text_for_audios: '{}',
      audio_options: {type: 'string[]', default: []},

      text_for_images: '{}',
      image_options: {type: 'string[]', default: []},

      audio_for_images: '{}?',
      image_options_for_audio: {type: 'string[]', default: []},

      words_to_match: {type: 'wordmatches[]', default: []},

      vocabs_used_to_generate: { type: 'string[]', default: [] },

    },
  };
}
