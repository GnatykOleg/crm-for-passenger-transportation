import React, { FC, useState } from "react";

import {
  Login,
  Registration,
  AuthByFacebook,
  AuthByGoogle,
  AuthByPhone,
} from "../../components";

import { signOut } from "firebase/auth";

import { useAppDispatch } from "../../hooks/redux-hooks";

import { auth } from "../../firebase/firebase-config";
import { handleSignOut } from "../../redux/auth/authOpertions";

const AuthPage: FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const authSwitcher = () => {
    setShowLogin((state) => !state);
    setShowSignUp((state) => !state);
  };

  return (
    <>
      <h4>Auth Page</h4>
      {showLogin && <Login authSwitcher={authSwitcher} />}
      {showSignUp && <Registration authSwitcher={authSwitcher} />}

      <AuthByFacebook />

      <AuthByGoogle />

      <AuthByPhone />
    </>
  );
};

export default AuthPage;
