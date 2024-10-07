import React, { useContext } from 'react';
import { fileUploadContext } from '../../Context/FileUploadContext';
import { taskContext } from '../../Context/TaskContext';
import { eventContext } from '../../Context/EventContext';
import { FaCheck } from 'react-icons/fa6';

const Option = ({ name, field }) => {
  const { eventState, eventDispatch } = useContext(eventContext);
  const { taskState, taskDispatch } = useContext(taskContext);

  return (
    <div
      onClick={() => {
        taskDispatch({ type: 'SET_FIELD', field: field, value: name });
        setTimeout(() => eventDispatch({ type: 'RESET_FORM' }), 10);
      }}
      className="option"
    >
      {taskState.task.status[0].toLowerCase() === name.toLowerCase() && (
        <FaCheck className="optionCheck" />
      )}
      {name}
      <div className={name === 'Doing' ? 'optionGreen' : name === 'Pending' ? 'optionYellow' : null}></div>
    </div>
  );
};

export default Option;