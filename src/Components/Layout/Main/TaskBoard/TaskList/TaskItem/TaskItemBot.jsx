import React, { useContext, useState, useEffect } from 'react'
import { Tag } from '../../../../../../Constants/Components'
import { authContext } from '../../../../../../Context/AuthContext'
import { taskContext } from '../../../../../../Context/TaskContext'

const TaskItemBot = () => {
  const { state } = useContext(authContext)
  const { taskState } = useContext(taskContext)
  const taskIds = taskState.tasks.assignees

  const [x, setX] = useState([])
//Working on the faces. Fetching the
  /* useEffect(() => {
    if (taskState.tasks.length > 0) {
      const getUsers = () => {
        if (taskIds.length > 0) {
          return taskIds
            .map((taskId) => state.users.find((user) => user.id === taskId))
            .filter(Boolean)  // filter out undefined values
        }
        return []
      }
      console.log(getUsers())
      setX(getUsers())
    }
  }, [taskState.tasks, taskIds, state.users]) */

  

  return (
    <div className='taskItemBottom'>
      <div className="taskItemTags">
        <Tag name='cat' />
        <Tag name='study' />
      </div>

      <div className="taskItemPeople">
        {x.length > 0 &&
          x.map((user) => (
            <img
              className='taskItemPerson'
              key={user.id}
              src={user.img}
              alt="profile_icon"
            />
          ))
        }
        {x.length > 5 && (
          <div className="morePeople">5+</div>
        )}
      </div>
    </div>
  )
}

export default TaskItemBot