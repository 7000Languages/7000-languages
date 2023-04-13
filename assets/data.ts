import { faker } from '@faker-js/faker';

import { CourseType } from "../src/@types";

export const courses: any[] = Array(50).fill(0).map(()=>{
   return {
    approved: faker.datatype.boolean(),
    admin_id: faker.datatype.uuid(),
    details: {
        admin_name: faker.internet.userName(),
        admin_email: faker.internet.email(),
        name: faker.vehicle.vehicle(),
        alternative_name: faker.internet.userName(),
        description: faker.datatype.string(),
        translated_language: 'English',
        population: faker.datatype.number(),
        location: 'LA, Brussels',
        link: faker.datatype.string(),
        is_private: faker.datatype.boolean(),
        code: faker.datatype.number()
    },
    lessons: faker.datatype.number()
   }
})