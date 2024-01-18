/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'
import InfoPanel from './InfoPanel'
import styled from 'styled-components'

const BackPlate = styled.div`
  position: absolute;
  top: 0;
  background: black;
  margin: auto;
  zIndex: 999;
  width: 100vw;
  height: 100vh;
`
const Aligner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin-left: -1em;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FittedImage = styled.img`
  position: relative;
  zIndex: 1000;
  margin: auto;
  max-width: calc(100vw - 2em);
  max-height: 100vh;
  height: auto;
  cursor: pointer;
`
const TileImageContainer = styled.div`
  width: fit-content;
  text-align: center;
  height: calc(100vh/3 - 4em/3);
  margin: 1em 1em 0 0;
`
const TileImage = styled.img`
  border-radius: 0 1em 0 0;
  height: calc(100vh/3 - 4em/3 - 1.7em);
  cursor: pointer;
`

const MyImage = (props) => {

  const [fit, setFit] = useState(false)
  
  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    // eslint-disable-next-line no-return-assign
    bytes.forEach((b) => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  const pic = new Image()
  pic.src = `data:${props.picture.contentType};`
  + `base64,${arrayBufferToBase64(props.picture.data.data)}`
  
  const handleFit = () => {
    props.focus.current.scrollIntoView()
    setFit(true)
    document.getElementById('styledapp').style.overflowY = 'hidden'
  }

  const handleUnfit = () => {
    setFit(false)
    document.getElementById('styledapp').style.overflowY = 'auto'
  }

  return fit ?
        <>
          <BackPlate/>
          <Aligner>
            <FittedImage 
              onClick={handleUnfit} 
              src={pic.src} 
              alt={props.name} 
              />
          </Aligner>
        </>
         :
        <TileImageContainer>
            <TileImage onClick={handleFit}
              src={pic.src} 
              alt={props.name} 
              title={props.details}
              />
            <InfoPanel {...props} />
        </TileImageContainer>
}

export default MyImage
