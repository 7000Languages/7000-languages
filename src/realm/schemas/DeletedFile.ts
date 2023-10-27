import { BSON } from "realm";

export default class DeletedFile extends Realm.Object {
  _id!: BSON.ObjectId;
  _item_id!: BSON.ObjectId; // this could be a unit, lesson or vocab id
  itemType!: "unit" | "Lesson" | "vocab";
  fileType!: "image" | "audio"
  filePath!: string;
  created_at!: Date;

  static schema = {
    name: 'deletedFiles',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      _item_id: 'string', // this could be a unit id, lesson is or vocab id
      itemType: 'string',
      fileType: 'string',
      filePath: 'string',
      created_at: {type: 'date', default: new Date},
    },
  };
}