import axios from 'axios'
import { BACKEND_URL } from '../config'

export const getTodos = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/todos`)
    return res.data.todos
  } catch (err) {
    return null
  }
}