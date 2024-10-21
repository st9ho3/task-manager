import React, { useContext } from 'react'
import { TaskItemBot, TaskItemMid, TaskItemTop} from '../../../../../../Constants/Components'
import { taskContext } from '../../../../../../Context/TaskContext'

const TaskItem = () => {
  const {taskState} = useContext(taskContext)

  return (
    <div className='taskItem'>
      <TaskItemTop />
      <TaskItemMid />
      <TaskItemBot />
    </div>
  )
}

export default TaskItem
