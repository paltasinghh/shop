import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/common/Button.jsx";

export default function LoginPage() {
  const { login, initiateSignup, initiatePasswordReset } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const success = login(data.email, data.password);
    if (success) {
      navigate("/");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    initiateSignup(data.email, data.name, data.password);
    navigate("/verify-email");
  };

  const onForgotPassword = () => {
    setShowReset(true);
  };

  const onResetSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    initiatePasswordReset(data.resetEmail);
    setResetMessage("Reset code sent. Check console.");
    navigate("/reset-password");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form
        onSubmit={onSubmit}
        className="bg-white border rounded p-4 space-y-3"
      >
        <div className="text-lg font-semibold">Login</div>
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        {loginError && <div className="text-red-500">{loginError}</div>}
        <Button type="submit">Login</Button>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-blue-500 text-sm underline"
        >
          Forgot Password?
        </button>
        {showReset && (
          <form onSubmit={onResetSubmit} className="space-y-2 border-t pt-3">
            <input
              name="resetEmail"
              required
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2"
            />
            <Button type="submit">Send Reset Code</Button>
            {resetMessage && (
              <div className="text-green-500">{resetMessage}</div>
            )}
          </form>
        )}
      </form>
      <form
        onSubmit={onSignup}
        className="bg-white border rounded p-4 space-y-3"
      >
        <div className="text-lg font-semibold">Signup</div>
        <input
          name="name"
          required
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <Button type="submit">Create Account</Button>
      </form>
    </div>
  );
}
