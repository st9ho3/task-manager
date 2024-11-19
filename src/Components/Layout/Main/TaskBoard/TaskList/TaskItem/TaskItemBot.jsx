import React, { useContext, useState, useEffect } from 'react'
import { Tag } from '../../../../../../Constants/Components'
import { authContext } from '../../../../../../Context/AuthContext'
import { taskContext } from '../../../../../../Context/TaskContext'

const TaskItemBot = ({task}) => {
  const { state } = useContext(authContext)
  const { taskState } = useContext(taskContext)
  
  const [faces,setFaces] = useState([])
  const getFaces = () => {
    return task.assignees.map((assignee) => {
      return state.users.find((user)=> user.id === assignee)
    })
  }
  useEffect(() => {
    setFaces(getFaces())
  },[])
  

  return (
    <div className='taskItemBottom'>
      <div className="taskItemTags">
        <Tag name='cat' />
        <Tag name='study' />
      </div>

      <div className="taskItemPeople">
        {task.assignees.length > 0 &&
          faces.map((user) => (
            <img
              className='taskItemPerson'
              key={user.id}
              src={user.img}
              alt="profile_icon"
            />
          ))
        }
        {task.assignees.length > 4 && (
          <div className="morePeople">5+</div>
        )}
      </div>
    </div>
  )
}

export default TaskItemBot