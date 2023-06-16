import { data, docRef } from "../src/config.js";
import { updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

let autoButton = document.getElementById("auto");
let manualButton = document.getElementById("manual");

/******************cookie*****************/
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 30 * 24 * 60 * 60 * 1000); // Set expiration to one month (30 days)
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Retrieve the saved state and boolean value from the cookie
var autoButtonState = getCookie("autoButtonState");
var autoButtonValue = getCookie("autoButtonValue");
var manualButtonState = getCookie("manualButtonState");
var manualButtonValue = getCookie("manualButtonValue");

if (autoButtonState === "on") {
  autoButton.classList.add("on");
  autoButtonValue = autoButtonValue === "true";
} else {
  autoButton.classList.add("off");
  autoButtonValue = autoButtonValue === "true";
}

if (manualButtonState === "on") {
  manualButton.classList.add("on");
  manualButtonValue = manualButtonValue === "true";
} else {
  manualButton.classList.add("off");
  manualButtonValue = manualButtonValue === "true";
}

autoButton.addEventListener("click", function () {
  autoButton.classList.toggle("on");
  autoButton.classList.toggle("off");
  manualButton.classList.remove("on");
  manualButton.classList.add("off");
  // Update the boolean value and save the state to the cookie
  autoButtonValue = autoButton.classList.contains("on");
  console.log(autoButtonValue);
  setCookie("autoButtonState", autoButtonValue ? "on" : "off", 30);
  setCookie("autoButtonValue", autoButtonValue.toString(), 30);
  setCookie("manualButtonState", "", 30);
  setCookie("manualButtonValue", "", 30);
});

manualButton.addEventListener("click", function () {
  if (!autoButtonValue) {
    manualButton.classList.toggle("on");
    manualButton.classList.toggle("off");
    autoButton.classList.remove("on");
    autoButton.classList.add("off");

    // Update the boolean value and save the state to the cookie
    manualButtonValue = manualButton.classList.contains("on");
    setCookie("manualButtonState", manualButtonValue ? "on" : "off", 30);
    setCookie("manualButtonValue", manualButtonValue.toString(), 30);
    setCookie("autoButtonState", "", 30);
    setCookie("autoButtonValue", "", 30);

    updateDoc(docRef, {
      allowance: manualButtonValue,
    });
  }
});