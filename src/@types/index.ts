export type UserType = {
  _id: string
  role: number
  authID: string
  name: string;
  email: string;
  phone: string;
  avatar: string;
  country?: string;
  city?: string;
  date_of_birth?: Date;
  adminLanguages: string[]
  learnerLanguages: string[]
  collaboratorLanguages: string[]
  completedActivityLevels?: string[]
  completedLessons?: string[]
  created_at: Date;
  updated_at: Date;
};

export type CourseType = {
  _id: string;
  approved: boolean;
  admin_id: string;
  details: CourseDetailsType;
};

export type CourseDetailsType = {
  admin_name: string;
  admin_email: string;
  name: string;
  alternative_name: string;
  description: string;
  translated_language: string;
  population: string;
  location: string;
  link: string;
  glotto: string;
  is_private: boolean;
  code: string;
};

export type UnitType = {
  _id: string;
  _course_id: string;
  _user_id: string;
  name: string;
  _order: number;
  selected: boolean;
  description: string;
  image: string;
  hidden: boolean;
  image_metadata: {};
  local_image_path: string;
  local_image_uploaded: boolean;
};

export type VocabType = {
  _id: string;
  _user_id: string;
  _course_id: string;
  _lesson_id: string;
  _order: number;
  original: string;
  translation: string;
  image: string;
  audio: string;
  selected: boolean;
  notes: string;
  hidden: boolean;
  local_image_path: string;
  local_audio_path: string;
  local_image_uploaded?: boolean;
  local_audio_uploaded?: boolean;
  image_metadata: object;
  audio_metadata: object;
  activities: ActivityType[];
  created_at: Date;
};

export type LessonType = {
  _id: string;
  _course_id: string;
  _unit_id: string;
  name: string;
  _order: number;
  selected: boolean;
  vocab: VocabType[];
  description: string;
  hidden: boolean;
  image_metadata: {};
  local_image_path: string;
  local_image_uploaded: boolean;
};

export type CompleteType = {
  _id: string;
  user_id: string;
  _course_id: string;
  _unit_id: string;
  _lesson_id: string;
};

export type UserGoogleInfoType = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
};

export type ActivityType = 'audio-to-text' | 'text-to-audio' | 'text-to-image' | 'text-to-text' | 'audio-to-image';

export type Activity = {
    _id: string
    type: string
    title: string
    instructions: string
    order: number
}

export type ActivityLevelType = {
  _id: string;
  _activity_id: string;
  _course_id: string;
  _lesson_id: string;
  _order: number;
  _vocab_id: string;

  audio_for_texts: {audio: string; correct_text_option: string};
  text_options: string[];

  text_for_audios: {text: string, correct_audio_option: string}
  audio_options: string[];

  text_for_images: {text: string, correct_image_option: string};
  image_options: string[];

  audio_for_images: {audio: string, correct_image_option: string};
  image_options_for_audio: string[];

  words_to_match: {original: string; translation: string}[];
};

export type DeletedFileType = {
  _id: string;
  _item_id: string; // this could be a unit id, lesson is or vocab id
  itemType: "unit" | "Lesson" | "vocab";
  fileType: "image" | "audio";
  filePath: string;
  created_at: Date;
}