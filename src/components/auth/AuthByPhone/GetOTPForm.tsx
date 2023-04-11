// Import required dependencies:

// React
import React, { FC, useState, FormEvent } from "react";

// Interfaces
import { IGetOTPFormProps } from "../../../interfaces/components/auth-components-types";

// React bootstrap
import { Button, Form } from "react-bootstrap";

// Phone input library
import PhoneInput from "react-phone-input-2";

// Toast library
import { toast } from "react-toastify";

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
        <Form.Group className="visually-hidden" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
        </Form.Group>

        <div className="d-block w-75 mx-auto">
          <p className="mb-3 ">Get OTP</p>
          <PhoneInput
            inputStyle={{ width: "100%" }}
            country={"ua"}
            value={phone}
            onChange={(phoneNumber: string) => setPhone("+" + phoneNumber)}
          />
        </div>

        <Button
          className="d-block w-50 mx-auto mt-3"
          variant="primary"
          type="submit"
        >
          Send confirm code
        </Button>
      </Form>

      <div className="d-block w-75 mx-auto" id="recaptcha-container" />
    </>
  );
};

// Export the GetOTPForm component:
export default GetOTPForm;
