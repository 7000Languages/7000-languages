import Realm, { BSON } from 'realm'

// function to get a random code for a new course
const getRandomCode = () => Math.random().toString(36).substring(2, 7)

export default class CourseDetails extends Realm.Object {

  admin_name!: string
  admin_email!: string
  name!: string
  alternative_name!: string
  description!: string
  glotto!: string
  translated_language!: string
  population!: string
  location!: string
  link!: string
  is_private!: boolean
  code! :string

  static schema = {
    name: 'coursedetails',
    embedded: true,
    properties: {
      admin_name: 'string',
      admin_email: 'string',
      name: 'string',
      alternative_name: 'string?',
      description: 'string?',
      glotto: 'string?',
      translated_language: 'string',
      population: 'string?',
      location: 'string?',
      link: 'string?',
      is_private: 'bool?',
      code: { type: 'string?', default: getRandomCode },
    },
  }
}
