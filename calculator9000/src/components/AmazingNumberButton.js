
import React from 'react'

export default function AmazingNumberButton(props) {
  return (
    <div><button onClick={props.handle} className='btn btn-number'>{props.number}</button></div>
  )
}
