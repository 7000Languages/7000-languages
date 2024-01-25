import { BSON } from "realm";

export default class CourseFlag extends Realm.Object {

    _id!: BSON.ObjectId
    _course_id!: string
    reason!: string[]
    additionalReason!: string | null
    created_at!: Date
    updated_at!: Date

    static schema = {
        name: 'courseFlags',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectId() },
            _course_id: { type: 'string', default: '' },
            reason: { type: 'string[]', default: [] },
            additionalReason: { type: 'string?', default: null },
            created_at: { type: "date?", default: new Date },
            updated_at: { type: "date?", default: new Date }
        }
        
    }
}