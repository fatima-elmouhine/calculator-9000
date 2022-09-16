import React from 'react'

export default function PreviousResult(props) {
    const handleChild = (id) => {
        props.handleDeleteParent(id);
    }
  return (
    <div className='resultRow'>

       {props.show && <span>{props.date}{props.calculation} =  {props.result} <button onClick={()=>{handleChild(props.value)}} className='btn btn-mark'><i className="fa-regular fa-circle-xmark"></i></button> </span>}
    </div>
  )
}
