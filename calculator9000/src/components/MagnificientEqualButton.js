import React from 'react'

export default function MagnificientEqualButton(props) {
  return (
    <div>
        <button className='btn' onClick={props.handleEqual}> = </button>
    </div>
  )
}

