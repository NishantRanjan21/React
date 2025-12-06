import React from "react";

const Contact = () => {
  return (
    <div className="contact-page">

      <div className="contact-box">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Contact No.</label>
          <input type="tel" placeholder="Enter your phone number" required />

          <label>Feedback</label>
          <textarea rows="5" placeholder="Write your feedback..." required />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

    </div>
  );
};

export default Contact;
