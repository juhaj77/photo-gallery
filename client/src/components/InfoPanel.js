import React, { useReducer } from 'react'
import styled from 'styled-components'
import { useField } from '../hooks/field'

const Container = styled.div`
  border-radius: 0 0 0 1em;
  white-space: nowrap;
  height: 1.7em;
  background-color: #800000;
  color: white;
  padding: 0;
`
const Content = styled.div`
  height: 1.7em;
  line-height: 1.7em;
  display: flex;
  flex-flow: row-wrap;
  font-size: 1em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  font-weight:700;
`
const LeftButton = styled.button`
  align-items: center;
  font-weight: bold;
  height: 1.5em;
  line-height: 1em;
  margin: .2em;
  padding:.1em .5em .1em .5em;
  border-width: .01em;
  background-color: #a35656;
  border: 2px solid #bf6f6f;
  border-style: outset;
  color:#debdbd;
`
const RightButton = styled.button`
  align-items: center; 
  font-weight: bold; 
  height: 1.5em; 
  line-height: 1em; 
  margin: .2em .2em .2em 0; 
  padding:.1em .5em .1em .5em; 
  border-width: .01em;
  background-color: #a35656;
  border: 2px solid #bf6f6f;
  border-style: outset;
  color:#debdbd;
`
const initial = { 
  basic: { display: ''}, 
  edit: { display:'none' } 
}
const reducer = state => state.basic.display === '' ? 
{ basic: { display: 'none'}, edit: { display:'' } } :
{ basic: { display: ''}, edit: { display:'none' } }

const InfoPanel = ({ name, id, details, update, remove }) => {
  const [style, toggle] = useReducer(reducer, initial)
  const newName = useField('text', name)
  const newDetails = useField('text', details)

  const handleUpdate = () => {
    update(id, newName.input.value, newDetails.input.value)
    toggle(style)
  }

  return (
    <Container>
      <Content style={style.basic}>
        <div style={{ margin: '0 0 .1em .7em', alignSelf: 'strech', lineHeight: '1em', height: '1em' }}>
          {name}
        </div>
        <div style={{ alignItems: 'center' }}>
          <LeftButton type="button" onClick={() => toggle(style)}>
            edit
          </LeftButton>
          <RightButton type="button" onClick={() => remove(id)}>
            delete
          </RightButton>
        </div>
      </Content>
      <Content style={style.edit}>
        <div style={{alignSelf: 'strech', alignItems: 'center' }}>
          <input
            placeholder={name}
            style={{ height: '1.6em', width: '5em' }}
            {...newName.input}
          />
          <input
            placeholder={details}
            style={{ height: '1.6em', width: '7em' }}
            {...newDetails.input}
          />
        </div>
        <div style={{ alignSelf: 'strech', alignItems: 'center' }}>
          <LeftButton type="button" onClick={handleUpdate}>
            save
          </LeftButton>
          <RightButton type="button" onClick={() => toggle(style)}>
            cancel
          </RightButton>
        </div>
      </Content>
    </Container>
  )
}

export default InfoPanel
