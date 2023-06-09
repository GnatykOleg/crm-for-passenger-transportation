// Import required dependencies:

// React
import React, { FC, FormEvent, useState } from "react";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// Interfaces
import {
  IAuthByEmail,
  InputEvent,
} from "../../../interfaces/components/auth-components-types";

// React Bootstrap
import { Form, Button } from "react-bootstrap";

// Declaring a AuthByEmail component using the props type from the IAuthByEmail interface:
const AuthByEmail: FC<IAuthByEmail> = ({
  // Default value for sign in method
  isRegistration = false,
  authMehod,
  submitButtonText,
}: IAuthByEmail) => {
  // Local state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  // Create dispatch from useAppDispatch Redux Typescript method
  const dispatch = useAppDispatch();

  // On from submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent default
    e.preventDefault();

    // Set state to default
    setEmail("");
    setPassword("");

    // Set nickname if registration method
    isRegistration && setNickname("");

    // Resulted data is not register we add data with nickname
    const data = isRegistration
      ? { email, password, nickname }
      : { email, password };

    // Dispatch the data using the authentication method that we accepted in the props
    dispatch(authMehod(data));
  };

  // Return JSX
  return (
    <Form onSubmit={onFormSubmit}>
      {/* Show only if this registration */}
      {isRegistration && (
        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            onChange={(e: InputEvent) => setNickname(e.currentTarget.value)}
            type="text"
            placeholder="Enter nickname"
            value={nickname}
            required
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e: InputEvent) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Enter email"
          value={email}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e: InputEvent) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Enter password"
          value={password}
          minLength={6}
          required
        />
      </Form.Group>

      <Button className="d-block w-50 mx-auto" variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

// Export the AuthByEmail component:
export default AuthByEmail;
