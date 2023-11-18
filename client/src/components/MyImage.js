/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'
import Header from './Header'
import InfoPanel from './InfoPanel'
import './hover.css'

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
          <img onClick={() => setFit(false)} 
            src={pic.src} 
            alt={props.name} 
            style={{ 
              position:'absolute',
              top:'0',
              zIndex:'1000',
              margin:'auto',
              maxWidth:'100vw',
              maxHeight:'100vh',
              height:'auto',
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
            <div className='hover'>
              <img onClick={() => setFit(true)}
                src={pic.src} 
                alt={props.name} 
                style={{ 
                  borderRadius: '0 1em 0 0',
                  height: 'calc(100vh/3 - 4em/3 - 1.7em)',
                  cursor:'pointer'
                }} />
              <span>{props.details}</span>
            </div>
            <InfoPanel {...props} />
        </div>
}
/*
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
            padding: '1.7em 0'
          }}></div>
          <img onClick={() => setFit(false)} 
            src={pic.src} 
            alt={props.name} 
            style={{ 
              position:'absolute',
              top:'0',
              zIndex:'1000',
              margin:'auto',
              maxWidth:'100vw',
              maxHeight:'100vh',
              height:'auto',
              cursor:'pointer',
              padding: '1.7em 0'
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
            <Header title={props.name} />
            <img onClick={() => setFit(true)}
              src={pic.src} 
              alt={props.name} 
              style={{ 
                borderRadius: '0 1em 0 0',
                height: 'calc(100vh/3 - 4em/3 - 1.7em)',
                cursor:'pointer'
              }} />
            <InfoPanel {...props} />
        </div>
}
*/
export default MyImage
