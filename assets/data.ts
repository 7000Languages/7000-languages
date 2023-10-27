import {faker} from '@faker-js/faker';

import {BSON} from 'realm';

export const locales = ['en', 'fr', 'es'];

export const languages = [
  {
    name: 'English',
    other: 'English',
  },
  {
    name: 'French',
    other: 'French',
  },
  {
    name: 'Spanish',
    other: 'spanish',
  },
];

let types = [
  'audio-to-text',
  'text-to-audio',
  'text-to-image',
  'text-to-text',
];

export const activityLevels = Array(8)
  .fill(0)
  .map(() => {
    let text_options = faker.random.words(4).split(' ')
    let audio_options = faker.random.words(4).split(' ')
    return {
      _id: faker.datatype.uuid(),
      _order: 0,
      type: types[Math.floor(Math.random() * types.length)],
      _lesson_id: faker.datatype.uuid(),

      audio_for_texts: {
        audio: '',
        text: text_options[Math.floor(Math.random() * text_options.length)],
      },
      text_options,

      text_for_audios: {text: audio_options[Math.floor(Math.random() * text_options.length)], audio: ''},
      audio_options,

      text_for_image: {text: faker.random.word(), image: ''},
      images_options: ['', '', '', ''],

      words_to_match: [
        {original: faker.random.word(), translation: faker.random.word()},
        {original: faker.random.word(), translation: faker.random.word()},
        {original: faker.random.word(), translation: faker.random.word()},
        {original: faker.random.word(), translation: faker.random.word()},
      ],
    };
  });
