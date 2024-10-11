import React, { useContext } from 'react'
import { FaRegFilePdf,FaRegFileExcel,FaRegFileWord } from "react-icons/fa6";
import { fileUploadContext } from '../../Context/FileUploadContext';


const AttachmentsDisplay = () => {
    const {fileState} = useContext(fileUploadContext)

// Split the file name into name and extension
const fileNameParts = fileState.fileName.split('.');
const baseName = fileNameParts[0]; // The file name without the extension
const extension = fileNameParts[fileNameParts.length - 1]; // The extension

// Create the shortened file name with dynamic extension
const shortenedFileName = `${baseName.slice(0, 6)}.${extension}`;
const fileType = fileState.fileType 

return (
    <div>
        {fileType === 'application/pdf' && <div name='pdf' className='attachmentsDisplay'>
        <FaRegFilePdf className='attItem' />
        <p className='attTitle'> 
            {shortenedFileName}
        </p>
        </div>}
        {fileType === 'application/excel' && <div name='excel' className='attachmentsDisplay'>
        <FaRegFileExcel className='attItem' />
        <p className='attTitle'> 
            {shortenedFileName}
        </p>
        </div>}
        {fileType === 'application/word' && <div name='word' className='attachmentsDisplay'>
        <FaRegFileWord className='attItem' />
        <p className='attTitle'> 
            {shortenedFileName}
        </p>
        </div>}
         
        </div>
  )
}

export default AttachmentsDisplay
