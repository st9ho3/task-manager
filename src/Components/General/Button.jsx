import React from 'react'
import { FaArrowRight } from "react-icons/fa";


const Button = ({action, text}) => {
  return (
    <div className='Button A' onClick={action}>
            {text}
            <FaArrowRight className='signoutArrow' />
          </div>
  )
}

export default Button
