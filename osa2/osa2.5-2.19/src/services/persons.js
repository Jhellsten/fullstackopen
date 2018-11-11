import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res
  } catch (error) {
    throw new Error(error)
  }
}

const create = async (newObject) => {
  try {
    const res = await axios.post(baseUrl, newObject)
    if(!res) {
      return 'Error'
    }
    return res
  } catch (error) {
    throw new Error(error)
  }
  
}

const update = async (id, newObject) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, newObject)
    if(!res){
      return 'Error'
    }
    return res
  } catch (error) {
    throw new Error(error)
  }
  
}
const del = async (id, newObject) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, newObject)
    if(!res) {
      return 'Error'
    }
    return res
  } catch (error) {
    throw new Error(error)
  }
  
}

export default { getAll, create, update, del }