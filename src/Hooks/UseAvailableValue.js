import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Context/AuthContext';
import { doc, updateDoc } from "firebase/firestore";
import {  db } from "../utils/Firebase";
import { taskContext } from '../Context/TaskContext';
import { eventContext } from '../Context/EventContext';

const useAvailableValue = () => {
  const { taskState, taskDispatch } = useContext(taskContext);
  const { state, authDispatch } = useContext(authContext);
  const { eventState } = useContext(eventContext);
  const newTag = taskState.newTag;

  // Function to handle adding a tag with trimming and space normalization
  const handleAddTag = (field) => {
    const trimmedTag = taskState.newTag[0].trim().replace(/\s+/g, ''); // Trim and remove extra spaces
    if (trimmedTag !== "" && !state.userDetails.tagsStore.includes(trimmedTag)) {
      authDispatch({ type: "ADD_NEW_TAG", payload: trimmedTag });
      if (field === "tagsStore") taskDispatch({ type: 'RESET_TAG' }); // Clear input after adding
    }
  };

  // Function to detect 'Enter' key and trigger tag addition
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission behavior if necessary
      handleAddTag('tagsStore');
    }
  };

  useEffect(() => {
    const updateTagsOntagsStore = async () => {
      const userToUpdate = doc(db, "users", state.userDetails.id);
      await updateDoc(userToUpdate, {
        tagsStore: state.tempTagsStore,
      });
    };

    if (state.tempTagsStore.length !== state.userDetails.tagsStore.length) {
      console.log(state.tempTagsStore.length > state.userDetails.tagsStore.length);
      updateTagsOntagsStore();
    }
  }, [eventState.taskOption]);

  // Function to handle input change with character limit and trimming
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove extra spaces between words
    if (value.length <= 14) {
      taskDispatch({ type: 'SET_TAG', field: 'newTag', value });
    }
  };

  return {
    handleAddTag,
    handleKeyPress,
    newTag,
    handleChange,
  };
};

export default useAvailableValue;