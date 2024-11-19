import React from 'react'

const TaskItemTop = ({task}) => {
  return (
    <div className="taskItemtop">
        <p className="taskItemTitle">
          {task.title}
        </p>
        <p className="taskItemCreationDate">
            {task.createdAt}
        </p>
        </div>
  )
}

export default TaskItemTop
