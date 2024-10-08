import React, { useContext } from 'react';
import { taskContext } from '../../Context/TaskContext';
import { IoClose } from "react-icons/io5";
import { getHashtagStyle } from '../../utils/TagsColorCond'

const Tag = ({ name, handleAddTag }) => {
  const { taskState, taskDispatch } = useContext(taskContext);
  const style =  getHashtagStyle(name) 
  // Fixing the deleteTag function
  const deleteTag = (t, field,e) => {
    e.stopPropagation()
    const newTags = taskState.task.tags.tagsStore.filter((tag) => tag !== t);
    taskDispatch({ type: 'REMOVE_TAG', field: field, payload: newTags });
  };
  const handleClick = (id) => {
    if (!taskState.task.tags.taskTags.includes(id)) {
      taskDispatch({ type: 'ADD_TAG', field: 'taskTags', payload: id });
    } else {
      const newArray = taskState.task.tags.taskTags.filter((tag) => tag !== id);
      taskDispatch({ type: 'REMOVE_TAG', field: 'taskTags', payload: newArray });
    }
  };
console.log(taskState.task.tags.taskTags)
  return (
    <div className={taskState.task.tags.taskTags.includes(name) ? "tagActive" : "tag"} style={style} onClick={()=>handleClick(name)} >
      {name}
      <IoClose onClick={(e) => deleteTag(name, 'tagsStore',e)} className="closeTagButton" />
    </div>
  );
};

export default Tag;