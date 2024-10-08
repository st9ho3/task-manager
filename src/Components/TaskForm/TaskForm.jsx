import React, { useContext } from 'react';
import { TaskFormData } from '../../Constants/TaskData';
import { eventContext } from '../../Context/EventContext';
import { taskContext } from '../../Context/TaskContext';
import {Element,TaskOption,TaskOptions,Option, AssigneeOption} from '../../Constants/Components';

const TaskForm = () => {
  const { eventState } = useContext(eventContext);
  const { taskState } = useContext(taskContext);
  return (
    <div className="taskForm">
      <div className="taskInputs">
        {TaskFormData.map((task) => (
          <Element key={task.id} data={task} type="task" />
        ))}
        <input className="taskInput desc" type="text" placeholder="Enter a description" />
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
        <TaskOption  field="Assignee" number="2">
          {eventState.taskOption === '2' && 
          <TaskOptions type='store'>
            <AssigneeOption />
            </TaskOptions>}
        </TaskOption>
        <TaskOption field="Priority" number="3">
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
      </div>
    </div>
  );
};

export default TaskForm;