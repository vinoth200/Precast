const usernameField=document.querySelector('#usernameField');
const feedBackArea=document.querySelector('.invalid-feedback');
const emailField=document.querySelector('#emailField');
const emailFeedBackArea =document.querySelector('.emailFeedBackArea');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');
const passwordFeedbackArea = document.querySelector('.passwordFeedbackArea');

//Username validation
usernameField.addEventListener("keyup", (e) =>{
    const usernameVal = e.target.value;
    //For remove the error message when user type correct format
    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display ="none";
    //Check whether there is any symbols
    if(usernameVal.length >0){
        fetch("/validate-username",{
         body:JSON.stringify({ username: usernameVal}),
         method:"POST",
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log("data", data);
            //for showing error message
            if (data.username_error){
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display ="block";
                feedBackArea.innerHTML = `<p>${data.username_error}</p>`;
            }
        })
    }

});


//Email validation
emailField.addEventListener("keyup", (e) =>{
    const emailVal = e.target.value;
    //For remove the error message when user type correct format
    emailField.classList.remove("is-invalid");
    emailFeedBackArea.style.display ="none";
    //Check whether there is any symbols
    if(emailVal.length >0){
        fetch("/validate-email",{
         body:JSON.stringify({ email: emailVal}),
         method:"POST",
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log("data", data);
            //for showing error message
            if (data.email_error){
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display ="block";
                emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
            }
        })
    }

});


// Password validation
password1.addEventListener("keyup", (e) => {
    const passwordVal = password1.value;
    password1.classList.remove("is-invalid");
    passwordFeedbackArea.style.display = "none";

    if (passwordVal.length < 8) {
        password1.classList.add("is-invalid");
        passwordFeedbackArea.style.display = "block";
        passwordFeedbackArea.innerHTML = "<p>Password must be at least 8 characters long.</p>";
    }
});

// Confirm password validation
password2.addEventListener("keyup", (e) => {
    const passwordVal = password1.value;
    const confirmPasswordVal = password2.value;

    password2.classList.remove("is-invalid");
    passwordFeedbackArea.style.display = "none";

    if (confirmPasswordVal !== passwordVal) {
        password2.classList.add("is-invalid");
        passwordFeedbackArea.style.display = "block";
        passwordFeedbackArea.innerHTML = "<p>Passwords do not match.</p>";
    }
});
