/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'
import InfoPanel from './InfoPanel'

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
          <div style={{ 
            position:'absolute',
            top:'0',
            background:'black',
            margin:'auto',
            zIndex:'999',
            width:'100vw',
            height:'100vh',
          }}></div>
          <img onClick={handleUnfit} 
            src={pic.src} 
            alt={props.name} 
            style={{ 
              position:'absolute',
              top:'0',
              zIndex:'1000',
              margin:'auto',
              maxWidth:'calc(100vw - 2em)',
              maxHeight:'100vh',
              height:'auto',
              marginRight:'1em',
              cursor:'pointer',
            }} />
        </>
         :
        <div style={{
            width: 'fit-content',
            textAlign: 'center',
            height: 'calc(100vh/3 - 4em/3)',
            margin: '1em 1em 0 0',
          }}
          >
            <img onClick={handleFit}
              src={pic.src} 
              alt={props.name} 
              title={props.details}
              style={{ 
                borderRadius: '0 1em 0 0',
                height: 'calc(100vh/3 - 4em/3 - 1.7em)',
                cursor:'pointer'
              }} />
            <InfoPanel {...props} />
        </div>
}

export default MyImage
