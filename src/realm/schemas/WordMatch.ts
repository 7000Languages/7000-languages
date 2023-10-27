import { BSON } from "realm";

export default class WordMatch extends Realm.Object{
   original!: string;
   translation!: string;

    static schema = {
        name: 'wordmatches',
        embedded: true,
        properties: {
            original: 'string',
            translation: 'string'
        }
    }
}