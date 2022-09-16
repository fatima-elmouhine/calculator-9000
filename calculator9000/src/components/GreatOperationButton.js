
import React from 'react'

export default function GreatOperationButton(props) {
  return (
    <div>
        <button onClick={props.handle}  className='btn'>{props.operation}</button>
    </div>
  )
}
