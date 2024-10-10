import React, { useState, useContext, useRef } from 'react';
import { eventContext } from '../../Context/EventContext';
import { taskContext } from '../../Context/TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TaskOption,
  TaskOptions,
  Option,
  AssigneeOption,
  TagsOption,
  Tag,
  Button,
} from '../../Constants/Components';
import { GoPaperclip } from "react-icons/go";
import useAddTask from '../../Hooks/UseAddTask';
import useAvailableValue from '../../Hooks/UseAvailableValue';
import { authContext } from '../../Context/AuthContext';
import useFileUpload from '../../Hooks/UseFileUpload';

const TaskForm = () => {
  const {fileInputRef, handleFileChange, fileState} = useFileUpload({
    storagePath: 'attachments/files',
    updateUserData: true,
    Field: 'attachments',
    maxFileSize: 2 * 1024 * 1024,
    allowedFileTypes: ['application/pdf']
    })
  const { eventState } = useContext(eventContext);
  const { taskState, taskDispatch } = useContext(taskContext);
  const { state } = useContext(authContext);
  const { handleKeyPress, handleAddTag, newTag, handleChange } = useAvailableValue();
  const { handleTaskCreation } = useAddTask();

  const datePick = useRef(null);



  return (
    <div className="taskForm">
      <div className="taskInputs">
        <input
          className="taskInput"
          placeholder="Enter Title"
          value={taskState.task.title}
          onChange={(e) => taskDispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })}
          type="text"
        />
        <textarea
          className="taskInput desc"
          type="area"
          value={taskState.task.description}
          onChange={(e) => taskDispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
          placeholder="Enter a description"
        />
      </div>

      <div className="taskOptions">
        <TaskOption field={taskState.task.status} number="1">
          {eventState.taskOption === '1' && (
            <TaskOptions type="list">
              <Option field="status" name="Pending" />
              <Option field="status" name="Doing" />
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption field="Assignees" number="2">
          {eventState.taskOption === '2' && (
            <TaskOptions type="store">
              <AssigneeOption />
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption field={taskState.task.priority} number="3">
          {eventState.taskOption === '3' && (
            <TaskOptions type="list">
              <Option field="priority" name="High" />
              <Option field="priority" name="Medium" />
              <Option field="priority" name="Low" />
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption field="Attachments" number="4">
          {eventState.taskOption === '4' && 
          <TaskOptions type="CandyShop">
            <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
            <GoPaperclip onClick={() => fileInputRef.current.click()} className='attachmentIcon' />
          </TaskOptions>}
        </TaskOption>

        <TaskOption field="Tags" number="5">
          {eventState.taskOption === '5' && (
            <TaskOptions type="CandyShop">
              <input
                placeholder="Enter a tag"
                className="tagsInput"
                type="text"
                value={newTag}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
              <TagsOption>
                {state.tempTagsStore.map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </TagsOption>
              <div className="addTagButton" onClick={() => handleAddTag('tagsStore')}>
                Add
              </div>
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption dateRef={datePick} field="Due Date" number="6" />

        <DatePicker ref={datePick} selected={taskState.task.dueDate} onChange={(date) => taskDispatch({ type: 'SELECT_DATE', payload: date })} />
      </div>

      <Button text="Create" action={handleTaskCreation} />
    </div>
  );
};

export default TaskForm;