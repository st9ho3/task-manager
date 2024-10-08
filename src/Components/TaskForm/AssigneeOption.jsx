import React, { useContext, useState } from 'react';
import { authContext } from '../../Context/AuthContext';
import { taskContext } from '../../Context/TaskContext';

const AssigneeOption = () => {
  const { state } = useContext(authContext);
  const { taskState, taskDispatch } = useContext(taskContext);

  const handleClick = (id) => {
    if (!taskState.task.assignees.includes(id)) {
      taskDispatch({ type: 'ADD_VALUE', field: 'assignees', payload: id });
    } else {
      const newArray = taskState.task.assignees.filter((user) => user !== id);
      taskDispatch({ type: 'REMOVE_VALUE', field: 'assignees', payload: newArray });
    }
  };

  // Remove unnecessary console.log statement
  // console.log(taskState.task.assignees);

  return (
    <ul className="assignees">
      {state.users &&
        state.users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleClick(user.id)}
            className={
              taskState.task.assignees.includes(user.id)
                ? 'assOptionActive'
                : 'assOption'
            }
          >
            <img className="userListImage" src={user.img} alt="userListImage" />
            {user.username}
          </li>
        ))}
    </ul>
  );
};

export default AssigneeOption;