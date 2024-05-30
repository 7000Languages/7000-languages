import {BSON, Object} from 'realm';

export default class JoinedCourse extends Object {
  _id!: BSON.ObjectId;
  _course_id!: string;
  _user_id!: string;
  currentCode!: string;
  completedLessons!: {lesson: string; numberOfVocabsCompleted: number}[];
  completedUnits!: string[];
  courseCompleted!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static schema = {
    name: 'joinedCourses',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _course_id: 'string',
      _user_id: 'string',
      currentCodeUsed: {type: 'string', default: ''},
      completedUnits: {type: 'string[]', default: []},
      completedLessons: {type: 'CompletedLesson[]', default: []},
      courseCompleted: {type: 'bool', default: false},
      created_at: {type: 'date', default: new Date()},
      updated_at: {type: 'date', default: new Date()},
    },
  };
}

export class CompletedLesson extends Realm.Object {
  static schema = {
    name: 'CompletedLesson',
    embedded: true,
    properties: {
      lesson: 'string',
      numberOfVocabsCompleted: 'int',
    },
  };
}
