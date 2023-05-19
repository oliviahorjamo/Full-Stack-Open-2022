import { DiaryEntry } from "./types";

/*
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
*/

export const isDiaryEntry = (object: unknown): object is DiaryEntry => {
  if ( !object || typeof object !== 'object') {
    return false;
  }

  if ('date' in object && 'visibility' in object && 'weather' in object && 'id' in object) {
    return true
  }
  return false
}