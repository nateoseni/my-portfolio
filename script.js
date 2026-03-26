//querySelector to get all of my buttons
const buttons = document.querySelectorAll('.toggle-btn');

//add event listener to each button using a loop
buttons.forEach(button => {
    button.addEventListener('click', function() {
        //find the project details in the div starting from the parentElement (project-card)
        const project = this.parentElement;
        //inside the specific button's card find the project details
        const details = project.querySelector('.project-details');
        if (details.style.display === "none" || details.style.display === ""){
            details.style.display = "block";
            this.textContent = "Hide Details"

        } else {
            details.style.display = "none";
            this.textContent = "Show Details";
        }
    });
});
