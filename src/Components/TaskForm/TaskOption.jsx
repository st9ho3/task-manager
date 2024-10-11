import React, { useContext } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { eventContext } from '../../Context/EventContext';
import { taskContext } from '../../Context/TaskContext';
import { GoPaperclip } from 'react-icons/go';
import useFileUpload from '../../Hooks/UseFileUpload';

const TaskOption = ({ children, field, number, dateRef }) => {
  const { eventDispatch } = useContext(eventContext);
  const { taskState } = useContext(taskContext);
  
  const showCheckIcon = field === 'Attachments' && taskState.task.attachments.length > 0;

  const { fileInputRef, handleFileChange } = useFileUpload({
    storagePath: 'attachments/files',
    updateUserData: true,
    Field: 'attachments',
    maxFileSize: 2 * 1024 * 1024,
    allowedFileTypes: ['application/pdf'],
  });

  const handleOptionClick = () => {
    if (field === 'Due Date') {
      dateRef.current.setOpen(true);
    } else if (field === 'Attachments') {
      fileInputRef.current.click();
    } else {
      eventDispatch({ type: 'SET_TASK', payload: number });
    }
  };

  return (
    <div className="taskOption" onClick={handleOptionClick}>
      {field !== 'Status' &&
        field !== 'Assignees' &&
        field !== 'Priority' &&
        field !== 'Tags' &&
        field !== 'Attachments' &&
        field !== 'Due Date' && (
          <FaCheck className="optionChecked" />
        )}
      {showCheckIcon && <FaCheck className="optionChecked" />}
      <p className="optionTitle">{field}</p>

      {field === 'Assignees' && (
        <div className={taskState.task.assignees.length > 0 ? 'assigneesNumber' : null}>
          {taskState.task.assignees.length > 0 && taskState.task.assignees.length}
        </div>
      )}

      {field === 'Attachments' && <GoPaperclip className="attachmentIcon" />}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      
      <div className="optionArrows">
        <IoIosArrowUp className="arrowUp" />
        <IoIosArrowDown className="arrowDown" />
      </div>

      {children}
    </div>
  );
};

export default TaskOption;
