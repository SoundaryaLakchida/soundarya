const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');
const submitSignIn = document.getElementById('submitSignIn');
const submitSignUp = document.getElementById('submitSignUp');

// Toggle between sign-in and sign-up forms
signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function () {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// Handle sign-in submission
submitSignIn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Firebase authentication logic for sign-in
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successful login, redirect to customerdetails.html
            window.location.href = "customerdetails.html";
        })
        .catch((error) => {
            // Handle errors here
            const errorMessage = error.message;
            const signInMessage = document.getElementById("signInMessage");
            signInMessage.style.display = "block";
            signInMessage.textContent = errorMessage;
        });
});

// Handle sign-up submission
submitSignUp.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;

    // Firebase authentication logic for sign-up
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successful sign-up, redirect to customerdetails.html
            window.location.href = "customerdetails.html";
        })
        .catch((error) => {
            // Handle errors here
            const errorMessage = error.message;
            const signUpMessage = document.getElementById("signUpMessage");
            signUpMessage.style.display = "block";
            signUpMessage.textContent = errorMessage;
        });
});
