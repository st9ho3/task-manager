import React, { useContext } from 'react';
import { GoSignOut } from 'react-icons/go';
import { eventContext } from '../../Context/EventContext';

const SignOutButton = () => {
  const { eventDispatch } = useContext(eventContext);

  return (
    <div
      className="signoutContainer"
      onClick={() => eventDispatch({ type: 'SHOW_MODAL', name: 'signOutRequest' })}
    >
      <GoSignOut className="signoutButton" />
    </div>
  );
};

export default SignOutButton;