import React from 'react'

export default function Toggler(props){
    const {handleToggler} = props
    return(
        <div className='toggler'>
          <div onClick={()=>handleToggler(1)} id={'toggler-1'} className='toggler-left toggler-selected'><span>1</span></div>
          <div onClick={()=>handleToggler(2)} id={'toggler-2'} className='toggler-mid'><span>2</span></div>
          <div onClick={()=>handleToggler(3)} id={'toggler-3'} className='toggler-mid'><span>3</span></div>
          <div onClick={()=>handleToggler(4)} id={'toggler-4'} className='toggler-right'><span>4</span></div>
        </div>
    )
}