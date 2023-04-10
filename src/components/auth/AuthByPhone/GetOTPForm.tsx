// Import required dependencies:

// React
import React, { FC, useState, FormEvent } from "react";

// Interfaces
import { IGetOTPFormProps } from "../../../interfaces/components/auth-types";

// React bootstrap
import { Button, Form } from "react-bootstrap";

// Phone input library
import PhoneInput from "react-phone-input-2";

// Toast library
import { toast } from "react-toastify";

// Styles module
import s from "./AuthByPhone.module.css";

// Phone input styles
import "react-phone-input-2/lib/style.css";

// Declaring a GetOTPForm component using the props type from the IGetOTPFormProps interface:
const GetOTPForm: FC<IGetOTPFormProps> = ({
  setUpRecaptcha,
}: IGetOTPFormProps) => {
  // Local state

  // Phone number
  const [phone, setPhone] = useState<string>("");

  // On form submit
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent default form
    e.preventDefault();

    // If phone empty retun warning with message
    if (!phone) return toast.warn("Phone cannot be empty!");

    // If phone true setPhone default
    setPhone("");

    // set up recaptcha
    await setUpRecaptcha(phone);
  };

  // Return JSX
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
        </Form.Group>

        <PhoneInput
          country={"ua"}
          value={phone}
          onChange={(phoneNumber: string) => setPhone("+" + phoneNumber)}
        />
        <Button className={s.button} variant="primary" type="submit">
          Send
        </Button>
      </Form>
      <div id="recaptcha-container" />
    </>
  );
};

// Export the GetOTPForm component:
export default GetOTPForm;
