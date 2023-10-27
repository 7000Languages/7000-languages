import { BSON } from "realm";

export default class Activity extends Realm.Object{
    _id!: BSON.ObjectId
    type!: string
    title!: string
    instructions!: string
    order!: number

    static schema = {
        name: 'activities',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectId() },
            type: 'string',
            title: 'string',
            instructions: 'string',
            order: 'int'
        }
    }
}