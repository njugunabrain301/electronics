import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = ({ closeModal }) => {
  const [signIn, setLogin] = useState(true);

  const toggleLogin = () => {
    if (signIn) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen">
      {signIn ? (
        <Login closeModal={closeModal} toggleLogin={toggleLogin} />
      ) : (
        <Register closeModal={closeModal} toggleLogin={toggleLogin} />
      )}
    </div>
  );
};

export default Auth;
