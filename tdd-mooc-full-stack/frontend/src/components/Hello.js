import axios from 'axios'
import React, { useState } from 'react'

const Hello = () => {
  const [hello, setHello] = useState()

  const getHello = async () => {
    const res = await axios.get('http://localhost:8080/api/hello')
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
