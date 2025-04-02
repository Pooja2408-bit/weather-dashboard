import React from 'react'

const Button = (props) => {
  return (
  <>
          <button onClick={props.onClick} className='btn btn-info ms-2'>{props.value}</button>
  </>
  )
}

export default Button
