import React, { useContext } from 'react'
import { TaskItemBot, TaskItemMid, TaskItemTop} from '../../../../../../Constants/Components'
import { taskContext } from '../../../../../../Context/TaskContext'

const TaskItem = ({task}) => {
  const {taskState} = useContext(taskContext)

  return (
    <div className='taskItem'>
      <TaskItemTop task={task} />
      <TaskItemMid task={task}/>
      <TaskItemBot task={task}/>
    </div>
  )
}

export default TaskItem
