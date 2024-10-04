import React from 'react';
import {PopUpWindow} from '../../../../Constants/Components'

const TaskBoard = () => {
  const handleSignOut = () => {
    // Sign out logic here
    console.log('Signing out...');
  };

  return (
    <div>
      {/* Displaying both popups for demonstration */}
      <PopUpWindow type="popup" />
      <PopUpWindow type="signout" handleSignOut={handleSignOut} />
    </div>
  );
};

export default TaskBoard;