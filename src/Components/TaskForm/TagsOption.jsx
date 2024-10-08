import React, { useState, useRef, useEffect, useContext } from 'react';
import { taskContext } from '../../Context/TaskContext';

const TagsOption = ({children}) => {
  const {taskState} =useContext(taskContext)
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setIsOverflowing(scrollHeight > clientHeight);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [taskState.task.tags.tagsStore]);

  const containerStyle = {
    overflowY: isOverflowing ? 'scroll' : 'hidden',
  };
  return (
    <div ref={containerRef} style={containerStyle} className='tagsShowroom'>
      {children}
    </div>
  )
}

export default TagsOption
