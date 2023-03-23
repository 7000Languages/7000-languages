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

export const convertToPlainObject = (data: Realm.Object) => {
    return Object.assign({}, JSON.parse(JSON.stringify(data)));
}