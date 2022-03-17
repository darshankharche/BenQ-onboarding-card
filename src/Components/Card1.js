import React from 'react'


export default function SubCard(props){
    const {header,para,children} = props
    return(
        <div className='sub-card'>
          <h1>{header}</h1>
          <p>{para}</p>
          {children}          
        </div>
    )
}