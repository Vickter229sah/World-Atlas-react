import 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form data from the form entries
    const formData = new FormData(event.target);
    const formInputData = Object.fromEntries(formData.entries());

    // EmailJS service credentials
    const serviceId = 'service_6v2q70o'; // Replace with your service ID
    const templateId = 'template_vozzahg'; // Replace with your template ID
    const publicKey = 'Pgl_3Naj6qTeYqhAV'; // Replace with your public key

    // Email template parameters
    const templateParams = {
      from_name: formInputData.username,
      from_email: formInputData.email,
      message: formInputData.message,
    };

    // Sending the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send the message. Please try again later.');
      });
  };

  return (
    <div 
  style={{
    position: "relative",
    height: "100vh",
    padding: "20px",
  }}
>
  {/* Background Image with Opacity */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: "url('https://www.baltana.com/files/wallpapers-29/World-Map-Background-Wallpapers-94603.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.6, // Opacity applied only to background
      zIndex: -1, // Moves background behind content
    }}
  ></div>
    
    <section className="section-contact">
      <h2 className="">Contact Us</h2>
      <p>If you have any questions, please reach out to us. <br/> We will respond as soon as we can.</p>
      <div className="contact-wrapper container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            required
            autoComplete="off"
            placeholder="Enter your name"
            name="username"
          />
          <input
            type="email"
            className="form-control"
            required
            autoComplete="off"
            placeholder="Enter your email"
            name="email"
          />
          <textarea
            className="form-control"
            rows="10"
            placeholder="Enter your message"
            name="message"
            required
            autoComplete="off"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
    </div>
  );
};
