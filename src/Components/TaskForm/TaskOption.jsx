import React, { useContext } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { eventContext } from '../../Context/EventContext';
import { FaCheck } from 'react-icons/fa6';
import { taskContext } from '../../Context/TaskContext';


const TaskOption = ({children, field, number}) => {
    const {eventDispatch} = useContext(eventContext)
    const {taskState} = useContext(taskContext)
    const showCheckIcon = field === 'Attachments' && taskState.task.attachments.length > 0;

    console.log(showCheckIcon)

  return (
    <div className='taskOption' onClick={() => eventDispatch({type:'SET_TASK', payload: number})}>
        {field !== 'Status' && field !== 'Assignee' && field !== 'Priority' && field !== 'Attachments'  && <FaCheck className="optionChecked" />}
        {showCheckIcon && <FaCheck className="optionChecked" />}
        <p className="optionTitle">
            {field}
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
