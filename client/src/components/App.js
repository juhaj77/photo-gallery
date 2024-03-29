import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { toast } from 'react-toastify'
import MyImage from './MyImage'
import UploadForm from './UploadForm'
import StyledSpinner from './StyledSpinner'
import { urlPrefix, options } from '../util/config'


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const StyledApp = styled.div`
  position: fixed;
  background:transparent;
  animation:400ms ${fadeIn} ease-in;
  top: 0;
  left: 0;
  width: calc(100vw - 1em);
  height: 100%;
  font-size: calc(.3vh + .3vw + 5px);
  margin: 0 0em 0 1em;
  display: flex;
  flex-wrap: wrap;
  transition: 500ms;
  align-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: transparent;
  overflow-y: auto;
  overflow-x: hidden;
`
const App = () => {
  const [itemArray, setItemArray] = useState(null)
  const [loading, setLoading] = useState(true)
  const focusElement = useRef()
  const addItem = (item) => {
    setItemArray(itemArray.concat(item))
  }

  const fetchFromServer = async () => {
    await axios.get(`${urlPrefix}/api/getall`)
      .then((res) => res.data)
      .then((data) => setItemArray(data.items))
      .catch((e) => console.log(e))
    setLoading(false)
  }

  const remove = async (id) => {
    setItemArray(itemArray.filter((i) => i.id !== id))
    try{
      toast.info('removing from server...', options)
      await axios.delete(`${urlPrefix}/api/delete/${id}`)
      toast.dismiss()
    } catch (e) {
      toast.dismiss()
      toast.error(e)
      fetchFromServer()
    }
  }

  const update = async (id, newName, newDetails) => {
    setItemArray(itemArray.map((i) => (i.id === id
      ? { ...i, name: newName, details: newDetails } : i)))
    try {
      toast.info('updating to server...', options)
      await axios.post(
        `${urlPrefix}/api/update/${id}`,
        { name: newName, details: newDetails },
      )
      toast.dismiss()
    } catch (e) {
      toast.dismiss()
      toast.error(e)
      fetchFromServer()
    }
  }

  useEffect(() => {
    console.log('process.env.NODE_ENV',process.env.NODE_ENV)
    fetchFromServer()
  }, [])

  return loading ? <StyledSpinner /> : (
    <StyledApp id='styledapp'>
      <div ref={focusElement}></div>
      {itemArray && itemArray.map((i) => (
        <MyImage
          key={i.id}
          focus={focusElement}
          remove={remove}
          update={update}
          {...i}
        />
      ))}
      <UploadForm
        addItem={addItem}
      />
    </StyledApp>
  )
}

export default App
