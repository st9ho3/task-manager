import React, { useContext } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {TaskOptions} from '../../Constants/Components'
import { eventContext } from '../../Context/EventContext';



const TaskOption = ({children, name, number}) => {
    const {eventDispatch} = useContext(eventContext)
  return (
    <div className='taskOption' onClick={() => eventDispatch({type:'SET_TASK', payload: number})}>
        <p className="optionTitle">
            {name}
        </p>
        <div className="optionArrows">
        <IoIosArrowUp className='arrowUp'/>
        <IoIosArrowDown className='arrowDown'/>
        </div>
        {children}
    </div>
  )
}

export default TaskOption
