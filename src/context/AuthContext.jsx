import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON, removeKey } from "../utils/storage.js";
import { sendVerificationEmail } from "../utils/email.js";

const AuthContext = createContext(null);
const KEY = "user";
const VERIFICATION_KEY = "verification_email";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(KEY, null));

  useEffect(() => {
    if (user) saveJSON(KEY, user);
  }, [user]);

  // LOGIN
  const login = (email, password) => {
    const storedUser = loadJSON(KEY, null);
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    removeKey(KEY);
  };

  // SIGNUP FLOW
  const initiateSignup = async (email, name, password) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save temporary signup session
    saveJSON(VERIFICATION_KEY, { email, name, password, code });

    // Send email using EmailJS
    try {
      await sendVerificationEmail(email, code);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Failed to send verification email:", error);
      // Optionally, you could set an error state or alert the user here
    }
  };

  // Verify OTP
  const verifyEmail = (enteredCode) => {
    const pending = loadJSON(VERIFICATION_KEY, null);

    if (pending && pending.code === enteredCode) {
      const newUser = {
        email: pending.email,
        name: pending.name,
        password: pending.password,
      };

      saveJSON(KEY, newUser);
      setUser(newUser);

      removeKey(VERIFICATION_KEY);
      return true;
    }

    return false;
  };

  // PASSWORD RESET FLOW
  const initiatePasswordReset = async (email) => {
    const user = loadJSON(KEY, null);
    if (!user || user.email !== email) return false;

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    saveJSON("reset_code", { email, code });

    try {
      await sendVerificationEmail(email, code);
      console.log("Password reset email sent successfully");
      return true;
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      return false;
    }
  };

  const resetPassword = (email, code, newPassword) => {
    const resetData = loadJSON("reset_code", null);

    if (resetData && resetData.email === email && resetData.code === code) {
      const user = loadJSON(KEY, null);
      if (user && user.email === email) {
        const updatedUser = { ...user, password: newPassword };
        saveJSON(KEY, updatedUser);
        setUser(updatedUser);
        removeKey("reset_code");
        return true;
      }
    }

    return false;
  };

  const value = {
    user,
    login,
    logout,
    initiateSignup,
    verifyEmail,
    initiatePasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
