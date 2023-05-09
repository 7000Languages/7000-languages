
/**
 * This function is responsible for taking in an array 
 * of Realm objects and returning and array of plain Object objects.
 * This is so that we can use TypeScript types on the objects and also avoid invalidation of objects
 * 
 * @param data This is an array of Realm objects
 * @returns an array of Plain objects
 */
export const convertToArrayOfPlainObject = (data: Realm.Object[]) => {
    return [
      ...data.map((course) =>
        Object.assign({}, JSON.parse(JSON.stringify(course)))
      ),
    ];
}

export const convertToPlainObject = (data: Realm.Object|object|string) => {
    if(typeof data === 'string') {
      return Object.assign({}, JSON.parse(data))
    }
    return Object.assign({}, JSON.parse(JSON.stringify(data)));
}

export const hasEmoji = (text: string): boolean => {
  const regex_emoji =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
  return regex_emoji.test(text);
};


export const formatAudioDuration = (seconds: number): string => {
  let calMinutes = Math.floor(seconds / 60);
  let calSeconds = Math.round(seconds - calMinutes * 60);
  return `${calMinutes > 9 ? calMinutes : `0${calMinutes}`} : ${
    calSeconds > 9 ? calSeconds : `0${calSeconds}`
  }`;
};