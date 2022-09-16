
import React from 'react'

export default function BeautifulScreen(props) {
  return (
    <div className="beautifulScreen">
        <p className='calcul'> {props.number}  </p>
        <p className='result'>{props.result}</p>
    </div>
  )
}
