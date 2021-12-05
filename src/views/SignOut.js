import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function SignOut() {

  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");

    history.push('/home');
  },[]);

  return (
    <>
    </>
  );
}

export default SignOut;
