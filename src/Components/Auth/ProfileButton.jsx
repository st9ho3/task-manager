import React, { useContext, useRef } from "react";
import { IoIosAdd } from "react-icons/io";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../utils/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { authContext } from "../../Context/AuthContext";
import { fileUploadContext } from "../../Context/FileUploadContext"; // Import the file upload context
import { eventContext } from "../../Context/EventContext";

const FileInput = () => {
  const { state } = useContext(authContext); // Get auth context
  const { fileState, uploadDispatch } = useContext(fileUploadContext); // Get file upload context
  const {eventDispatch} = useContext(eventContext)

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadDispatch({ type: "SET_FILE_NAME", payload: selectedFile.name });
      uploadDispatch({ type: "SET_FILE_URL", payload: selectedFile });
      setTimeout(() => {
        eventDispatch({type: "SHOW_MODAL", name: 'notification'})
      },800)
      setTimeout(() => {
        eventDispatch({type: "HIDE_MODAL", name: 'notification'})
      },5000)
      uploadFile(selectedFile);
    }
  };

  const updateUser = async (imageUrl) => {
    const userDocRef = doc(db, "users", state.currentUser.uid);
    await updateDoc(userDocRef, { img: imageUrl });
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `images/${new Date().getTime()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadDispatch({ type: "SET_UPLOAD_PROGRESS", payload: progress });
      },
      (error) => {
        console.error(error);
        uploadDispatch({ type: "SET_UPLOAD_ERROR" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUser(downloadURL);
        });
      }
    );
  };

  return (
    <div className="custom-file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />

      <div className="profileIcon">
        <IoIosAdd
          className="addPicIcon"
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer", fontSize: "24px" }}
        />

        {state.userDetails && (
          <img
            className="profileCanvas"
            src={fileState.fileURL ? fileState.fileURL : state.userDetails.img}
            alt="Profile"
            style={{ width: "45px", height: "45px" }}
          />
        )}
      </div>
    </div>
  );
};

export default FileInput;