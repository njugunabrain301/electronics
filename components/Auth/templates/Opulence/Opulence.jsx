import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const Opulence = ({ closeModal, selectedTheme }) => {
  const [signIn, setLogin] = useState(true);
  const [forgot, setForgot] = useState(false);

  const toggleLogin = () => {
    if (signIn) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const toggleForgotPass = () => {
    if (forgot) {
      setForgot(false);
    } else {
      setForgot(true);
    }
  };

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen">
      {signIn ? (
        forgot ? (
          <ForgotPassword
            closeModal={closeModal}
            toggleForgotPass={toggleForgotPass}
            selectedTheme={selectedTheme}
          />
        ) : (
          <Login
            closeModal={closeModal}
            toggleLogin={toggleLogin}
            toggleForgotPass={toggleForgotPass}
            selectedTheme={selectedTheme}
          />
        )
      ) : (
        <Register
          closeModal={closeModal}
          toggleLogin={toggleLogin}
          selectedTheme={selectedTheme}
        />
      )}
    </div>
  );
};

export default Opulence;
