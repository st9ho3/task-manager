import React, { useContext } from 'react';
import { taskContext } from '../../Context/TaskContext';
import { IoClose } from "react-icons/io5";
import { getHashtagStyle } from '../../utils/TagsColorCond';
import { authContext } from '../../Context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { storage, db } from "../../utils/Firebase";

const Tag = ({ name,type }) => {
  const { state, authDispatch } = useContext(authContext);
  const { taskState, taskDispatch } = useContext(taskContext);
  const style = getHashtagStyle(name);

  // Fixing the deleteTag function
  const deleteTag =  (t, e) => {
    e.stopPropagation();
    const newTags = state.tempTagsStore.filter((tag) => tag !== t);
    authDispatch({ type: 'REMOVE_TEMP_TAG', payload: newTags });
  };
  
  
     const handleClick = (id) => {
     if (type === 'taskForm') {
      if (!taskState.task.tags.includes(id)) {
        taskDispatch({ type: 'ADD_VALUE', field: 'tags', payload: id });
      } else {
        const newArray = taskState.task.tags.filter((tag) => tag !== id);
        taskDispatch({ type: 'REMOVE_VALUE', field: 'tags', payload: newArray });
      }
     } else {
      console.log("Only for reading.")
     }
    
  }

  return (
    <div
      className={type === 'taskForm' ?
        taskState.task.tags.includes(name) ? "tagActive" : 'tag' : 'tagForDisplay'}
      style={style}
      onClick={() => handleClick(name)}
    >
      {name}
      {type === 'taskForm' && <IoClose
        onClick={(e) => deleteTag(name, e)}
        className="closeTagButton"
      />}
    </div>
  );
};

export default Tag;

