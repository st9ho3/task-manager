import React, { useContext } from 'react'
import { FaCheck } from "react-icons/fa6";
import { fileUploadContext } from '../../Context/FileUploadContext';

const Option = ({name}) => {
    const {fileState} = useContext(fileUploadContext)
  return (
    <div className='option'>
    <FaCheck className='optionCheck' />
      {name}
      <img className='optionImg' src={fileState.fileURL} alt="imageperson" />
    </div>
  )
}

export default Option
