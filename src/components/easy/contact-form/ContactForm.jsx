import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    let newErrors = { name: "", email: "", message: "" };

    // Name validation
    if (!name) newErrors.name = "Name is required";

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Message validation
    if (!message) newErrors.message = "Message is required";

    setErrors(newErrors);

    // If no errors → success
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setSuccessMessage(`Thank you, ${name}`);
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <div>
      {successMessage ? (
        <div>{successMessage}</div>
      ) : (
        <form className="form" data-testid="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name" className="name">
              Name :
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="Enter your name"
              data-testid="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="email">
              Email :
            </label>
            <input
              id="email"
              x
              className="input"
              type="email"
              placeholder="Enter your email"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="message">
              Message :
            </label>
            <input
              id="message"
              className="input"
              type="text"
              placeholder="Enter your message"
              data-testid="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <p>{errors.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
