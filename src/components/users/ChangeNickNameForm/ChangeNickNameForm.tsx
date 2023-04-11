// Import required dependencies:

// React
import React, { FC, useState } from "react";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// Operations
import { changeUserNickname } from "../../../redux/users/usersOperations";

// React Bootstrap
import { Button, Form } from "react-bootstrap";

// Declaring a PrivateRoute component
const ChangeNickNameForm: FC = () => {
  // Local State

  // Change nickname value
  const [changeNickName, setChangeNickName] = useState<string>("");

  // Getd ispatch from  useAppDispatch hooks
  const dispatch = useAppDispatch();

  // return JSX
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(changeUserNickname(changeNickName));
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicCarModel">
        <Form.Label>Change nickname</Form.Label>
        <Form.Control
          onChange={(e) => setChangeNickName(e.currentTarget.value)}
          type="text"
          placeholder="Change nickname"
          value={changeNickName}
        />
      </Form.Group>

      <Button className="d-block mx-auto" type="submit">
        Change nickname
      </Button>
    </Form>
  );
};

// Export the ChangeNickNameForm component:
export default ChangeNickNameForm;
