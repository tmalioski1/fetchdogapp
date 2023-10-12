import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session?.user);

  const onLogout = async (e) => {
    await dispatch(logout());

    if (sessionUser) {
        navigate('/');
    }
  };

  return <button className='log-out-button' onClick={onLogout}>Sign Out</button>;
};

export default LogoutButton;
