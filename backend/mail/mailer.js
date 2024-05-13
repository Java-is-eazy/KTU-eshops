const formData = require("form-data");
const MailGun = require("mailgun.js");

const mailgun = new MailGun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MailGunAPIKey,
});

const sendEmail = async (mailTo, url) => {
  const messageData = {
    from: "ProductForge <ignas.kanapinskas@gmail.com>",
    to: [mailTo],
    subject: "Password Recovery",
    text:
      "You have requested a password recovery, please click the following link to reset your password: " +
      url +
      ", if you did not request this, please ignore this email.",
  };

  client.messages
    .create(process.env.MailGunDomain, messageData)
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
};

module.exports = { sendEmail };
