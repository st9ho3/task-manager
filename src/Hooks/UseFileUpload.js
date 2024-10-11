import { useContext, useRef, useCallback, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from '../utils/Firebase';
import { authContext } from '../Context/AuthContext';
import { fileUploadContext } from '../Context/FileUploadContext';
import { eventContext } from '../Context/EventContext';
import { taskContext } from '../Context/TaskContext';

const useFileUpload = (options = {}) => {
  const {
    storagePath,
    updateUserData,
    Field,
    onUploadSuccess,
    maxFileSize,
    allowedFileTypes,
  } = options;

  const { state } = useContext(authContext);
  const { taskState } = useContext(taskContext);
  const { fileState, uploadDispatch } = useContext(fileUploadContext);
  const { eventDispatch } = useContext(eventContext);

  const fileInputRef = useRef(null);
  let selectedRef = useRef('');

  const updateCollection = async (collection, fileUrl, id) => {
    if (updateUserData) {
      const userDocRef = doc(db, collection, id);

      if (Field === 'attachments') {
        await updateDoc(userDocRef, { [Field]: arrayUnion(fileUrl) });
      } else {
        await updateDoc(userDocRef, { [Field]: fileUrl });
      }
    }

    if (onUploadSuccess) {
      onUploadSuccess(fileUrl);
    }
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `${storagePath}/${new Date().getTime()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadDispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress });
      },
      (error) => {
        console.error(error);
        uploadDispatch({ type: 'SET_UPLOAD_ERROR' });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateCollection('users', downloadURL, state.currentUser.uid);
          file.type === 'application/pdf' &&
            updateCollection('tasks', downloadURL, taskState.task.id);
          
        });
      }
    );
  };

  const handleFileChange = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      selectedRef.current = selectedFile;
      

      if (selectedFile) {
        // Check file size
        if (selectedFile.size > maxFileSize) {
          eventDispatch({ type: 'SHOW_MODAL', name: 'error', message: 'File is too large' });
          return;
        }

        // Check file type if specified
        if (allowedFileTypes && !allowedFileTypes.includes(selectedFile.type)) {
          eventDispatch({ type: 'SHOW_MODAL', name: 'error', message: 'File type not allowed' });
          return;
        }

        uploadDispatch({ type: 'SET_FILE_NAME', payload: selectedFile.name });
        uploadDispatch({ type: 'SET_FILE_TYPE', payload: selectedFile.type });
        uploadDispatch({
          type: 'SET_FILE_URL',
          field: 'fileURL',
          payload: selectedFile,
        });

        (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') &&
          uploadDispatch({
            type: 'SET_FILE_URL',
            field: 'fileImg',
            payload: selectedFile,
          });

        setTimeout(() => {
          eventDispatch({ type: 'SHOW_MODAL', name: 'notification' });
        }, 800);

        setTimeout(() => {
          eventDispatch({ type: 'HIDE_MODAL', name: 'notification' });
        }, 5000);
      }

      if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
        uploadFile(selectedFile);
      }
    },
    [uploadDispatch, eventDispatch, maxFileSize, allowedFileTypes]
  );

  useEffect(() => {
    if (selectedRef.current) {
      uploadFile(selectedRef.current);
    }
  }, [taskState.tasks]);

  return {
    fileInputRef,
    handleFileChange,
    fileState,
    state,
  };
};

export default useFileUpload;
