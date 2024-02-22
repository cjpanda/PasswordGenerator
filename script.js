const passwordText = document.getElementById("passwordText");
const characterNumber = document.getElementById("characterNumber");
const passwordLengthInput = document.getElementById("passwordLength");
const includeUppercaseCheckbox = document.getElementById("includeUppercase");
const includeLowercaseCheckbox = document.getElementById("includeLowercase");
const includeNumbersCheckbox = document.getElementById("includeNumbers");
const includeSymbolsCheckbox = document.getElementById("includeSymbols");
const generatePasswordButton = document.getElementById(
  "generatePasswordButton"
);

const passwordStrength = document.getElementById("passwordStrength");
const passwordStrengthBox1 = document.getElementById("passwordStrengthBox1");
const passwordStrengthBox2 = document.getElementById("passwordStrengthBox2");
const passwordStrengthBox3 = document.getElementById("passwordStrengthBox3");
const passwordStrengthBox4 = document.getElementById("passwordStrengthBox4");
const errorMessageChars = document.getElementById("errorMessageChars");
const errorMessageCheckbox = document.getElementById("errorMessageCheckbox");
const copyImage = document.getElementById("copyImage");

copyImage.addEventListener("click", () => {
  const passwordText = document.getElementById("passwordText");
  const generatedPassword = passwordText.textContent;

  navigator.clipboard
    .writeText(generatedPassword)
    .then(() => {
      // Password copied successfully
      console.log("Password copied to clipboard:", generatedPassword);
      window.alert("Password copied to clipboard,");
    })
    .catch((error) => {
      // Unable to copy password
      console.error("Failed to copy password:", error);
      window.alert("Failed to copy password");
    });
});

function generatePassword() {
  const length = parseInt(passwordLengthInput.value);
  const includeUppercase = includeUppercaseCheckbox.checked;
  const includeLowercase = includeLowercaseCheckbox.checked;
  const includeNumbers = includeNumbersCheckbox.checked;
  const includeSymbols = includeSymbolsCheckbox.checked;

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allowedChars = "";
  let generatedPassword = "";
  if (includeUppercase) allowedChars += uppercaseChars;
  if (includeLowercase) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  if (includeSymbols) allowedChars += symbolChars;

  // Calculate password strength
  let strength = "";
  if (length >= 0 && length <= 4) {
    strength = "Weak";
  } else if (length > 4 && length <= 8) {
    strength = "Medium";
  } else {
    strength = "Strong";
  }
  // Update password strength text
  passwordStrength.textContent = strength;
  // Update password strength boxes based on strength level
  switch (strength) {
    case "Weak":
      passwordStrengthBox1.style.backgroundColor = "red";
      passwordStrengthBox2.style.backgroundColor = "transparent";
      passwordStrengthBox3.style.backgroundColor = "transparent";
      passwordStrengthBox4.style.backgroundColor = "transparent";

      passwordStrengthBox1.style.border = "2px solid transparent";
      passwordStrengthBox2.style.border = "2px solid var(--text-color)";
      passwordStrengthBox3.style.border = "2px solid var(--text-color)";
      passwordStrengthBox4.style.border = "2px solid var(--text-color)";
      break;
    case "Medium":
      passwordStrengthBox1.style.backgroundColor = "orange";
      passwordStrengthBox2.style.backgroundColor = "orange";
      passwordStrengthBox3.style.backgroundColor = "transparent";
      passwordStrengthBox4.style.backgroundColor = "transparent";

      passwordStrengthBox1.style.border = "2px solid orange";
      passwordStrengthBox2.style.border = "2px solid orange";
      passwordStrengthBox3.style.border = "2px solid var(--text-color)";
      passwordStrengthBox4.style.border = "2px solid var(--text-color)";
      break;
    case "Strong":
      passwordStrengthBox1.style.backgroundColor = "green";
      passwordStrengthBox2.style.backgroundColor = "green";
      passwordStrengthBox3.style.backgroundColor = "green";
      passwordStrengthBox4.style.backgroundColor = "green";

      passwordStrengthBox1.style.border = "2px solid green";
      passwordStrengthBox2.style.border = "2px solid green";
      passwordStrengthBox3.style.border = "2px solid green";
      passwordStrengthBox4.style.border = "2px solid green";
      break;
    default:
      passwordStrengthBox1.style.backgroundColor = "transparent";
      passwordStrengthBox2.style.backgroundColor = "transparent";
      passwordStrengthBox3.style.backgroundColor = "transparent";
      passwordStrengthBox4.style.backgroundColor = "transparent";
  }

  if (length <= 0) {
    errorMessageChars.textContent = "Password cant be less than 0 characters";
  } else {
    errorMessageChars.textContent = "";
  }

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    errorMessageCheckbox.textContent =
      "At least 1 set of characters must be selected";
    return; // Exit the function early if no checkbox is checked
  } else {
    errorMessageCheckbox.textContent = "";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    generatedPassword += allowedChars[randomIndex];
  }

  passwordText.textContent = generatedPassword;
}

function updateCharacterNumber() {
  characterNumber.textContent = passwordLengthInput.value;
}

generatePasswordButton.addEventListener("click", generatePassword);
passwordLengthInput.addEventListener("input", updateCharacterNumber);

// Initial update of character number display
updateCharacterNumber();
generatePassword();
