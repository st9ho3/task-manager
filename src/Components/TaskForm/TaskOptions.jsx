import React, { useContext, useEffect, useRef } from 'react'
import { eventContext } from '../../Context/EventContext'

const TaskOptions = ({children}) => {
    const {eventDispatch} = useContext(eventContext)
    const windowRef = useRef(null)
    useEffect(() => {
        console.log('useefect')
        const handleClickOutside = (e) => {
            if (windowRef.current && !windowRef.current.contains(e.target)) {
                eventDispatch({type:'RESET_FORM'})
            } }
            document.addEventListener("mousedown", handleClickOutside)
    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
    },[windowRef])

  return (
    <div ref={windowRef} className='optionShowroom'>
      {children}
    </div>
  )
}

export default TaskOptions
