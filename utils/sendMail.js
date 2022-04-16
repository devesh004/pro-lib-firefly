const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = async (to, otp) => {
  const msg = {
    to: to, // Change to your recipient
    from: "barpitkumar2000@gmail.com", // Change to your verified sender
    subject: "Password reset request",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
      <p>Your one time password for email varification is. This will expire after 5 minutes from now</p>
      <h3>Password: ${otp}</h3>
  </div>`,
  };
  await sgMail.send(msg);
};
