// Import required dependencies:

// React
import React, { FC, useState, FormEvent } from "react";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// Operations
import { phoneAuth } from "../../../redux/auth/authOpertions";

// Interface
import { IConfirmOTPFormProps } from "../../../interfaces/components/auth-components-types";

// React Bootstrap
import { Button, Form } from "react-bootstrap";

//  OTP input
import OtpInput from "react-otp-input";

// Toast library
import { toast } from "react-toastify";

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
        <Form.Group className="visually-hidden" controlId="formBasicOTP">
          <Form.Label>Type OTP from SMS code!</Form.Label>
        </Form.Group>

        <div className="d-block w-50 mx-auto">
          <p className="text-warning text-center mb-3 fs-4">
            Type code from SMS!
          </p>
          <OtpInput
            inputStyle={{ width: "100%" }}
            value={OTP}
            onChange={(value) => setOTP(value)}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <Button
          className="d-block w-50 mx-auto mt-3"
          variant="primary"
          type="submit"
        >
          Verify OTP
        </Button>
      </Form>
    </>
  );
};

// Export the ConfirmOTPForm component:
export default ConfirmOTPForm;
