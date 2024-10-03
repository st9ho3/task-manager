import React, { useRef, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

const FileInput = () => {
  const fileInputRef = useRef(null); // Ref to access the file input element
  const fileURLRef = useRef(null); // Ref to store the file URL
  const [fileName, setFileName] = useState(""); // Store file name for display

  const handleFileChange = () => {
    const selectedFile = fileInputRef.current.files[0]; // Get the selected file from the input

    if (selectedFile) {
      // Store the file URL in the ref
      fileURLRef.current = URL.createObjectURL(selectedFile);
      setFileName(selectedFile.name); // Store the file name for display
    }
  };

  // Clean up the file URL when component unmounts
  useEffect(() => {
    return () => {
      if (fileURLRef.current) {
        URL.revokeObjectURL(fileURLRef.current); // Revoke URL when component unmounts
      }
    };
  }, []);

  return (
    <div className="custom-file-upload">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef} // Ref for file input
        onChange={handleFileChange} // Trigger function when file is selected
        style={{ display: "none" }}
        id="fileInput"
      />

      {/* Icon to trigger the file input */}
      <IoIosAdd 
      className="icon"
      onClick={() => fileInputRef.current.click()} // Trigger the click event on the file input
      style={{ cursor: "pointer", fontSize: "24px" }} />

      {/* Display file name or a preview */}
      {fileName && (
        <div className="profileIcon">
          
          {fileInputRef.current.files[0]?.type.startsWith("image/") && (
            <img src={fileURLRef.current} alt="Preview" style={{width: '45px',height: '45px'
            }} />
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;