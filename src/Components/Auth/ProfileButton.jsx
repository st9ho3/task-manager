import React, { useContext, useRef } from "react";
import { IoIosAdd } from "react-icons/io";
import useFileUpload from "../../Hooks/UseFileUpload";

const FileInput = () => {
  const {fileInputRef, handleFileChange, fileState, state} = useFileUpload({
    storagePath: 'images/profiles',
    updateUserData: true,
    Field: 'img',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    allowedFileTypes: ['image/jpeg', 'image/png']
})

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

        {state.userDetails.img && (
          <img
            className="profileCanvas"
            src={fileState.fileType === 'image/png' || fileState.fileType === 'image/jpeg' && fileState.fileURL ? fileState.fileURL : state.userDetails.img}
            alt="Profile"
            style={{ width: "45px", height: "45px" }}
          />
        )}
      </div>
    </div>
  );
};

export default FileInput;