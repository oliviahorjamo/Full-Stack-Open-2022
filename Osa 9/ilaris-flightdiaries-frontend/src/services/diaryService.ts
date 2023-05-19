import axios from 'axios'
import { NewDiaryEntry, DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3001/api/diaries/'

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  try {
    const res = await axios.post<DiaryEntry>(baseUrl, object)
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Error(error.response.data)
      }
      return Error(error.message)
    }
    return Error('something went wrong')
  }
}