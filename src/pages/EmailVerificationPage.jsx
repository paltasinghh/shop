import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/common/Button.jsx";

export default function EmailVerificationPage() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const success = verifyEmail(data.code);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid verification code");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded p-6 space-y-4">
      <div className="text-lg font-semibold">Verify Your Email</div>
      <p>Enter the 6-digit code sent to your email.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="code"
          required
          type="text"
          placeholder="Verification Code"
          className="w-full border rounded px-3 py-2"
          maxLength="6"
        />
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
}
