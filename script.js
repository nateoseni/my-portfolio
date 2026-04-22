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

const toggle = document.querySelector('#theme-toggle');

// function switchTheme() {
//     if (e.target.checked) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'light');
//     }
// }

// toggle.addEventListener('change', switchTheme, false);

    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
});

//canvas API for bonus

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//
let x = 100;
let velocityX = 1; //the velocity of the animated circle
let velocityY = 1;
let y = 100; 
let radius = 30;



function animate() {
    requestAnimationFrame(animate);
    //clear the canvas each time it refreshes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); // dimensions of the circle (x, y, radius, start angle, end angle)
    ctx.fillStyle = 'aquamarine';
    ctx.fill();
    ctx.stroke();

    //make sure circle doesnt go off the screen, reverse the velocity when the edge of the circle reaches the end of the canvas width
    if(x + radius > canvas.width || x - radius < 0) {
        velocityX = -velocityX;
    }
    //same thing as before, but with the top and bottom of the screen
    if(y + radius > canvas.height || y - radius < 0) {
        velocityY = -velocityY
    }
    //increment the circle with the velocity to make it move
    x += velocityX;
    y += velocityY;
}
animate();

const headerCanvas = document.getElementById('header-canvas');
const headerCtx = headerCanvas.getContext('2d');

let w, h, dpr;

//make sure the canvas resizes with the window and accounts for device pixel ratio
function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    headerCanvas.width = w * dpr;
    headerCanvas.height = h * dpr;
    headerCanvas.style.width = w + 'px';
    headerCanvas.style.height = h + 'px';
    headerCtx.setTransform(1, 0, 0, 1, 0, 0);
    headerCtx.scale(dpr, dpr);
}

resize();

window.addEventListener('resize', resize);

const particles = [];
const count = 120;

function createParticle(x, y) {
    return {
        x: x !== undefined ? x : Math.random() * w,
        y: y !== undefined ? y : Math.random() * h,
        size: Math.random() * 2 + 1,
        speed: Math.random() *0.6 + 0.2,
        drift: (Math.random() - 0.5) * 0.5,
        glow: Math.random() * 0.3 + 0.7,
        hue: Math.random() * 40 + 260, // purple spectrum for the colour of particles
        phase: Math.random() * Math.PI * 2 // random phase for the glow effect
    };
}

for (let i = 0; i < count; i++) {
    particles.push(createParticle());
}

let mouse = { x: w / 2, y: h / 2 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function draw() {
    headerCtx.clearRect(0, 0, w, h);
    
    const time = Date.now();

    headerCtx.shadowBlur = 0;
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                headerCtx.beginPath();
                headerCtx.strokeStyle = `rgba(255, 100, 255, ${(1 - dist / 80) * 0.2})`; // line color with fading effect based on distance
                headerCtx.lineWidth = 0.5;
                headerCtx.moveTo(p1.x, p1.y);
                headerCtx.lineTo(p2.x, p2.y);
                headerCtx.stroke();
            }
        });
    });

    // shadow for all particles
    headerCtx.shadowBlur = 12;
    headerCtx.shadowColor = 'rgba(255, 100, 255, 0.7)';

    particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1; // prevent division by zero
        const force = Math.max(0, 150 - dist) / 150; // repulsion force based on distance

        //update particle position with repulsion from mouse
        p.y -= p.speed + force * 1.2;
        p.x += p.drift + (force * dx / dist) * 0.3;

        if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
        }

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const pulseSize = p.size + Math.sin(time * 0.003 + p.phase) * 0.3;

        //draw the particle with color variation
        headerCtx.beginPath();
        headerCtx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.glow})`;
        headerCtx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        headerCtx.fill();
    });

    requestAnimationFrame(draw);
}

draw();