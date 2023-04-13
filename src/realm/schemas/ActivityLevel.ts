import { BSON } from "realm";

export default class ActivityLevel extends Realm.Object {
  _id!: BSON.ObjectId;
  activity_id!: string;
  lesson_id!: string;
  level!: number;

  audio_for_texts!: string;
  text_options!: string[];
  audio_text_match!: number; // index of the correct answer in text_options

  text_for_audios!: string;
  audio_options!: string[];
  text_audio_match!: number; // index of the correct answer in audio_options

  text_for_images!: string;
  image_options!: string[];
  text_image_match!: number; // index of the correct answer in image_options

  original_words!: string[];
  translated_words!: string[];

  static schema = {
    name: "activityLevels",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      activity_id: "string",
      lesson_id: "string",
      level: "int",
      audio_for_texts: "string?",
      text_options: { type: "string[]", default: [] },
      audio_text_match: "int?",
      text_for_audios: "string?",
      audio_options: { type: "string[]", default: [] },
      text_audio_match: "int?",
      text_for_images: "string?",
      image_options: { type: "string[]", default: [] },
      text_image_match: "int?",
      original_words: { type: "string[]", default: [] },
      translated_words: { type: "string[]", default: [] },
    },
  };
}
