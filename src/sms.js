// main.js
import Twilio from "twilio";

const accountSid = "AC0d760b2a64d34a20ebf5145964635470";
const authToken = "996c59aca0a8e0224e88648defd4b44e";
const twilioPhoneNumber = "+14027266421";

const form = document.getElementById("smsForm");
form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const phoneNumberInput = document.getElementById("phoneNumber");
  const messageInput = document.getElementById("message");

  const to = phoneNumberInput.value;
  const body = messageInput.value;

  sendSMS(to, body);
}

function sendSMS(to, body) {
  const client = new Twilio(accountSid, authToken);

  client.messages
    .create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    })
    .then((message) => {
      console.log("SMS sent successfully. Message SID:", message.sid);
    })
    .catch((error) => {
      console.error("Failed to send SMS:", error);
    });
}
