import emailjs from "emailjs-com";

export function sendVerificationEmail(email, code) {
  try {
    console.log("Attempting to send verification email to:", email);
    const result = emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        verification_code: code,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    console.log("EmailJS send result:", result);
    return result;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}
