import React, { useContext, useEffect, useRef } from 'react';
import { eventContext } from '../../Context/EventContext';

const TaskOptions = ({ children, type }) => {
  const { eventDispatch } = useContext(eventContext);
  const windowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        eventDispatch({ type: 'RESET_FORM' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [windowRef]);

  return (
    <div
      ref={windowRef}
      className={
        type === 'list'
          ? 'optionShowroom'
          : type === 'CandyShop'
            ? 'optionCandyShop' 
            : type === 'store'
              ? 'optionStoreSmall'
              : null

      }
    >
      {children}
    </div>
  );
};

export default TaskOptions;