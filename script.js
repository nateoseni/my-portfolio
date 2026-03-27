//querySelector to get all of my buttons
const buttons = document.querySelectorAll('.toggle-btn');

//add event listener to each button using a loop
buttons.forEach(button => {
    button.addEventListener('click', function() {
        //find the project details in the div starting from the parentElement (project-card)
        const project = this.parentElement;
        //inside the specific button's card find the project details
        const details = project.querySelector('.project-details');
        //check if there is already content shown in the details section, if not display the content and change button
        if (details.style.display === "none" || details.style.display === ""){
            details.style.display = "block";
            this.textContent = "Hide Details"
        //if content is already shown, change display to none upon button press and change the button
        } else {
            details.style.display = "none";
            this.textContent = "Show Details";
        }
    });
});

//need to use js to make sure the contact form has input validation for empty name, email address, message and invalid mail address
//need to implement preventing form submission
////need to tell js when form is submitted

const form = document.getElementById('contact-form');
const errorMsg = document.getElementById('error-message');

//function to show error messages in red
function showError(message) {
    errorMsg.innerText = message;
    errorMsg.style.color = "red";
}
//event listener upon pressing the submit button
form.addEventListener('submit', function(event) {
    //preventDefault to not reload the page
    event.preventDefault();

    //get the elements from html
    const nameInput = document.getElementById('name').value.trim(); //value to and trim to remove any extra spaces a user may have added
    const emailInput = document.getElementById('email').value.trim();
    const messageInput = document.getElementById('message').value.trim();

    //email validation check
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //see if any of the input fields are empty
    if(nameInput === "" || emailInput === "" || messageInput === ""){
        showError("Please enter information in all fields");
        return;
    }
    //check if the email format is not valid
    if(!emailFormat.test(emailInput)) {
        showError("Invalid email, try again");
        return;
    }
    //clear the error message
    errorMsg.innerText = "";
    alert("Successful submission");
    //reset form upon submission
    form.reset();
});