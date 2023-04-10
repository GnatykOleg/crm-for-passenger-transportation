// Import required dependencies:

// React
import React, { FC, useState, FormEvent } from "react";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// Operations
import { phoneAuth } from "../../../redux/auth/authOpertions";

// Interface
import { IConfirmOTPFormProps } from "../../../interfaces/components/auth-types";

// React Bootstrap
import { Button, Form } from "react-bootstrap";

//  OTP input
import OtpInput from "react-otp-input";

// Toast library
import { toast } from "react-toastify";

// Styles module
import s from "./AuthByPhone.module.css";

// Declaring a ConfirmOTPForm component using the props type from the IConfirmOTPFormProps interface:
const ConfirmOTPForm: FC<IConfirmOTPFormProps> = ({
  captchaConfirmObj,
}: IConfirmOTPFormProps) => {
  // State

  // Set OTP
  const [OTP, setOTP] = useState<string>("");

  // Get dispatch from useAppDispatch
  const dispatch = useAppDispatch();

  // On form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent default form
    e.preventDefault();

    // If OTP empty retun warning with message
    if (!OTP) return toast.warn("OTP from SMS cannot be empty!");

    // If OTP true setOTP default
    setOTP("");

    // Dispatch to operations OTP and captcha confirm object
    dispatch(phoneAuth({ OTP, captchaConfirmObj }));
  };

  // Return JSX
  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicOTP">
          <Form.Label>Type OTP from SMS code</Form.Label>
        </Form.Group>

        <OtpInput
          inputStyle={{ width: "100%" }}
          value={OTP}
          onChange={(value) => setOTP(value)}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />

        <Button className={s.button} variant="primary" type="submit">
          Verify OTP
        </Button>
      </Form>
    </>
  );
};

// Export the ConfirmOTPForm component:
export default ConfirmOTPForm;
