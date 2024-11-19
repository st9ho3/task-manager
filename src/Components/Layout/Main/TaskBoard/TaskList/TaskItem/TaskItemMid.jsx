import React from 'react'

const TaskItemMid = ({task}) => {
  return (
    <div>
       <p className="taskitemDesc">
        {task.description}
          </p>
          <hr className='taskItemBorder' />
    </div>
  )
}

export default TaskItemMid
