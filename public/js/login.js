// Get the login form and error message div
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

// Create an object with the email and password of the user
const user = {
  email: "artur@example.com",
  password: "1234",
};

// Listen for the form submission event
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior

  // Get the email and password input fields
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Check if the email and password are correct
  if (email === user.email && password === user.password) {
    // Redirect the user to the protected page
    window.location.href = "/views/crud.ejs";
  } else {
    // Display an error message
    errorMessage.textContent = "Invalid email or password.";
  }
});
