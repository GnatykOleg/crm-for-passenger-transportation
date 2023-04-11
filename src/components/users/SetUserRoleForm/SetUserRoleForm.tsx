// Import required dependencies:

// React
import React, { FC, useState } from "react";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// Operations
import { changeUserRole } from "../../../redux/users/usersOperations";

// Constants
import { ROLES } from "../../../consts/roles";

// Interfaces
import {
  ChangeRoleSelectValues,
  ISetUserRoleForm,
  RolesToChange,
} from "../../../interfaces/components/users-components-types";

// React Bootstrap
import { Badge, Button, Form } from "react-bootstrap";

import MyModal from "../../common/MyModal/MyModal";

// React select
import Select from "react-select";

// Declaring a SetUserRoleForm component using the props type from the ISetUserRoleForm interface:
const SetUserRoleForm: FC<ISetUserRoleForm> = ({
  show,
  handleShowModal,
  user,
}: ISetUserRoleForm) => {
  // Locat state

  // Set user role
  const [role, setRole] = useState<RolesToChange>("PASSANGER");

  // Get dispatch from hook useAppDispatch
  const dispatch = useAppDispatch();

  // Вestructuring values from ROLES
  const { DISPATCHER, DRIVER, PASSANGER } = ROLES;

  // Make new array with roles options for react select
  const rolesOptions = [DISPATCHER, DRIVER, PASSANGER].map((role) => ({
    value: role,
    label: role,
  }));

  // On form submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form
    e.preventDefault();

    // Open modal
    handleShowModal();

    // Dispatch to redux operations changeUserRole with data
    dispatch(
      changeUserRole({
        // If the user logged in using a phone number, he may not have an email
        value: user.email || user.phoneNumber,
        valueName: user.email ? "email" : "phoneNumber",
        role,
      })
    );
  };

  // Return JSX
  return (
    <MyModal
      show={show}
      handleShowModal={handleShowModal}
      title={`Change Role for user: ${user?.displayName}`}
    >
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>
            Role: Current role
            <Badge className="ms-1" bg="info">
              {user?.role}
            </Badge>
          </Form.Label>
          <Select
            onChange={(value: ChangeRoleSelectValues) => setRole(value!.value)}
            name="roles"
            required
            noOptionsMessage={() => "Not selected role"}
            options={rolesOptions}
            maxMenuHeight={200}
          />
        </Form.Group>

        <Button className="d-block mx-auto" variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </MyModal>
  );
};

// Export the PrivateRoute component:
export default SetUserRoleForm;
