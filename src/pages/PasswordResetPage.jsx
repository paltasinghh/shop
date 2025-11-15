import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/common/Button.jsx";

export default function PasswordResetPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code and new password
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmitEmail = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    setEmail(data.email);
    setStep(2);
  };

  const onSubmitReset = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const success = resetPassword(email, data.code, data.newPassword);
    if (success) {
      navigate("/login");
    } else {
      setError("Invalid code or email");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded p-6 space-y-4">
      {step === 1 ? (
        <>
          <div className="text-lg font-semibold">Reset Password</div>
          <p>Enter your email to receive a reset code.</p>
          <form onSubmit={onSubmitEmail} className="space-y-3">
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
            />
            <Button type="submit">Send Reset Code</Button>
          </form>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold">Enter Reset Code</div>
          <p>Enter the code sent to your email and your new password.</p>
          <form onSubmit={onSubmitReset} className="space-y-3">
            <input
              name="code"
              required
              type="text"
              placeholder="Reset Code"
              className="w-full border rounded px-3 py-2"
              maxLength="6"
            />
            <input
              name="newPassword"
              required
              type="password"
              placeholder="New Password"
              className="w-full border rounded px-3 py-2"
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit">Reset Password</Button>
          </form>
        </>
      )}
    </div>
  );
}
