import axios from 'axios'
import React, { useState } from 'react'
import { BACKEND_URL } from '../config'

const Hello = () => {
  const [hello, setHello] = useState()

  const getHello = async () => {
    const res = await axios.get(`${BACKEND_URL}/hello`)
    setHello(res.data)
  }

  return (
    <>
      <button id="hello-button" onClick={getHello}>Get hello message</button>
      <div>{hello}</div>
    </>
  )
}

export default Hello
