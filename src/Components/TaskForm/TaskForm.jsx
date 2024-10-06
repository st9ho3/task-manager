import React, { useContext } from 'react'
import { TaskFormData } from '../../Constants/TaskData'
import {Element, TaskOption, TaskOptions} from '../../Constants/Components'
import { eventContext } from '../../Context/EventContext'

const TaskForm = () => {
  const {eventState} = useContext(eventContext)
console.log(eventState.taskOption)
  return (
    <div className='taskForm'>
      <div className="taskInputs">
      {TaskFormData.map((task) => 
      <Element key= {task.id} data={task} type= 'task' />)
      }
      <input className='taskInput desc' type="text" placeholder='Enter a description' />
      </div>
      <div className="taskOptions">
        <TaskOption name='Assignee' number = '1'>
          {eventState.taskOption === '1' && <TaskOptions/>}
        </TaskOption>
        <TaskOption name='Status' number = '2'>
        {eventState.taskOption === '2' && <TaskOptions/>}
        </TaskOption>
        <TaskOption name='Priority' number = '3'>
        {eventState.taskOption === '3' && <TaskOptions/>}
        </TaskOption>
        <TaskOption name='Attachments' number = '4'>
        {eventState.taskOption === '4' && <TaskOptions/>}
        </TaskOption>
        
        
      </div>
      
      
    </div>
  )
}

export default TaskForm
