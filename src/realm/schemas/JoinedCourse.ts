import { BSON, Object } from "realm";

export default class JoinedCourse extends Object{
    _id!: BSON.ObjectId
    _course_id!: string
    _user_id!: string
    currentCode!: string
    created_at!: Date
    updated_at!: Date

    static schema = {
        name: 'joinedCourses',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: () => new BSON.ObjectId()},
            _course_id: 'string',
            _user_id: 'string',
            currentCode: 'string',
            created_at: { type: 'date', default: new Date },
            updated_at: { type: 'date', default: new Date }
        }
    }
}