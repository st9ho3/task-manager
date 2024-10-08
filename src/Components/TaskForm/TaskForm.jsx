import React, {useState, useContext } from 'react';
import { TaskFormData } from '../../Constants/TaskData';
import { eventContext } from '../../Context/EventContext';
import { taskContext } from '../../Context/TaskContext';
import {Element,TaskOption,TaskOptions,Option, AssigneeOption, TagsOption, Tag} from '../../Constants/Components';

const TaskForm = () => {
  const { eventState } = useContext(eventContext);
  const { taskState, taskDispatch } = useContext(taskContext);
  const [newTag, setNewTag] = useState("");

  // Function to handle adding a tag with trimming and space normalization
  const handleAddTag = (field) => {
    const trimmedTag = newTag.trim().replace(/\s+/g, ''); // Trim and remove extra spaces

    if (trimmedTag !== "" && !taskState.task.tags.tagsStore.includes(trimmedTag)) {
      taskDispatch({ type: "ADD_TAG", field: field, payload: trimmedTag });
      {field === "tagsStore" && setNewTag("")}; // Clear input after adding}
    }
  };

  // Function to detect 'Enter' key and trigger tag addition
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission behavior if necessary
      handleAddTag('tagsStore');
    }
  };

  // Function to handle input change with character limit and trimming
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove extra spaces between words
    if (value.length <= 14) { // Restrict input to 10 characters
      setNewTag(value);
    }
  };
  return (
    <div className="taskForm">
      <div className="taskInputs">
        <input className='taskInput' placeholder='Enter Title' value={taskState.task.title} onChange={(e) => taskDispatch({type:'SET_FIELD', field: 'title', value:e.target.value })} type="text" />
        <input className="taskInput desc" type="text" value={taskState.task.description} onChange={(e) => taskDispatch({type:'SET_FIELD', field: 'description', value:e.target.value })} placeholder="Enter a description" />
      </div>
      <div className="taskOptions">
        <TaskOption  field={taskState.task.status} number="1">
          {eventState.taskOption === '1' && (
            <TaskOptions type='list'>
              <Option field="status" name="Pending" />
              <Option field="status" name="Doing" />
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption  field="Assignees" number="2">
          {eventState.taskOption === '2' && 
          <TaskOptions type='store'>
            <AssigneeOption />
            </TaskOptions>}
        </TaskOption>

        <TaskOption field={taskState.task.priority} number="3">
          {eventState.taskOption === '3' && (
            <TaskOptions type='list'>
              <Option field="priority" name="High" />
              <Option field="priority" name="Medium" />
              <Option field="priority" name="Low" />
            </TaskOptions>
          )}
        </TaskOption>

        <TaskOption  field="Attachments" number="4">
          {eventState.taskOption === '4' && <TaskOptions type='store' />}
        </TaskOption>

        <TaskOption  field="Tags" number="5">
          {eventState.taskOption === '5' && 
          <TaskOptions type='CandyShop'>
            <input 
                      placeholder="Enter a tag"
                      className="tagsInput"
                      type="text"
                      value={newTag}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      />
            <TagsOption>
            {taskState.task.tags.tagsStore.map((tag) => <Tag key={tag} name={tag} handleAddTag={handleAddTag} /> )}
              
            </TagsOption>
            <div className="addTagButton" onClick={() => handleAddTag('tagsStore')}>Add</div>
          </TaskOptions>}
        </TaskOption>
      </div>
    </div>
  );
};

export default TaskForm;