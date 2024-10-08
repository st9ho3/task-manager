import React, { useContext } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { eventContext } from '../../Context/EventContext';
import { taskContext } from '../../Context/TaskContext';

const TaskOption = ({ children, field, number }) => {
  const { eventDispatch } = useContext(eventContext);
  const { taskState } = useContext(taskContext);
  const showCheckIcon = field === 'Attachments' && taskState.task.attachments.length > 0;

  return (
    <div className="taskOption" onClick={() => eventDispatch({ type: 'SET_TASK', payload: number })}>
      {field !== 'Status' &&
        field !== 'Assignees' &&
        field !== 'Priority' &&
        field !== 'Attachments' && (
          <FaCheck className="optionChecked" />
        )}
      {showCheckIcon && <FaCheck className="optionChecked" />}
      <p className="optionTitle">{field}</p>
      {field === 'Assignees' && (
        <div className={taskState.task.assignees.length > 0 ? 'assigneesNumber' : null}>
          {taskState.task.assignees.length > 0 && taskState.task.assignees.length}
        </div>
      )}
      <div className="optionArrows">
        <IoIosArrowUp className="arrowUp" />
        <IoIosArrowDown className="arrowDown" />
      </div>
      {children}
    </div>
  );
};

export default TaskOption;