import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import { Progress } from 'reactstrap'
import { useField } from '../hooks/field'
import { options, urlPrefix } from '../util/config'

const FlexItem = styled.div`
  text-align: left; 
  width: 100%; 
  align-self: strech;
`
const Container2 = styled.div`
  height: calc(100vh/3 - 4em/3 - 1em); 
  width: calc(9vw + 9vh); 
  max-width: 13.5em;
  overflow:hidden; 
  border-radius:0 1em 0 1em;
  color: white; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin:1em 1em 0 0;
  background-color: #800000;
  align-content: space-between; 
  flex-wrap: nowrap; 
  padding: .5em; 
  white-space: nowrap;
  text-overflow: ellipsis;
`
const FormHeader = styled.span`
  font-size: 1.2em; 
  line-height: 1em; 
  font-weight: 800; 
  padding: 0; 
  color: white;
`
const LabelStyle = styled.p`
  line-height: 1em; 
  margin: 0.2em 0 0.3em 0; 
  font-size: 1.2em;
  font-weight:bold; 
`
const TextInput = styled.input`
  line-height: 1.5em;
  height: auto;
  width: calc(100% - .5em);
  font-size: 1em; 
  margin: 0 1em 0 0; 
  padding: 0;
`

const UploadForm = ({ addItem }) => {
  const [loaded, setLoaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const itemName = useField('text', '')
  const itemDetails = useField('text', '')

  const onChangeHandler = (event) => {
    const { files } = event.target
    if(files[0] && files[0].size < 5000000 && files[0].name.match(/\.(JPG|jpg|jpeg|png)$/)) {
      setLoaded(0)
      setSelectedFile(files[0])
    } else {
      toast.warn('File type is wrong or file size too big!')
    }
  }

  const upload = async (payload) => {
    try {
      toast.info('uploading...', options)
      const res = await axios.post(`${urlPrefix}/api/add`, payload, {
        onUploadProgress: (ProgressEvent) => {
        // eslint-disable-next-line no-mixed-operators
          setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
        },
      })
      const item = await axios.get(`${urlPrefix}/api/get/${res.data}`)
      toast.dismiss()
      toast.success('upload success')
      addItem(item.data)
    } catch (e) {
      toast.dismiss()
      toast.error('upload fail')
    }
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('uploaded_file', selectedFile)
    data.append('name', itemName.input.value)
    data.append('details', itemDetails.input.value)
    upload(data).then(() => {
      setLoaded(0)
      setSelectedFile(null)
      document.getElementById('file').value = ''
      itemName.reset()
      itemDetails.reset()
    }).catch((e) => {
      toast.dismiss()
      toast.error(e)
    })
  }

  return (
    <Container2>
      <FormHeader>
        ADD NEW
      </FormHeader>
      <FlexItem>
        <LabelStyle>Upload picture (jpg/png) </LabelStyle>
        <input
          id='file'
          style={{ textOverflow:'clip', lineHeight: '1em', fontSize: '1em', margin: '0' }}
          type="file"
          name="upload_file"
          className="form-control-file"
          onChange={onChangeHandler}
        />
      </FlexItem>
      <FlexItem>
        <LabelStyle>name </LabelStyle>
        <TextInput placeholder="required" {...itemName.input} className="form-control" required />
      </FlexItem>
      <FlexItem>
        <LabelStyle>details </LabelStyle>
        <TextInput {...itemDetails.input} className="form-control" />
      </FlexItem>
      <FlexItem>
        <ToastContainer style={{ fontSize: '1.4em' }} />
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2) }
          %
        </Progress>
        <button
          style={{
            fontSize: '1.2em', fontWeight: 'bold', verticalAlign: 'middle', display: 'inline-block',
          }}
          type="submit"
          className="btn btn-success btn-block"
          onClick={onClickHandler}
        >
          submit
        </button>
      </FlexItem>
    </Container2>
  )
}

export default UploadForm
