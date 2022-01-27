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

export const createTodo = async (todo) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/todos`, todo)
    return res.data.todo
  } catch (err) {
    return null
  }
}

export const modifyTodo = async (todo) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/todos`, todo)
    return res.data.todo
  } catch (err) {
    return null
  }
}