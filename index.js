let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click",toggleDarkMode);



document.addEventListener('DOMContentLoaded', (event) => {
    const rsvpForm = document.getElementById("rsvp-form"); 
    const firstNameInput = document.getElementById("fname");
    const whereFromInput = document.getElementById("from");   
    const emailInput = document.getElementById("email");
    const participantList = document.getElementById("rsvp-participants");
    const rsvpCountElement = document.getElementById("rsvp-count");
    const rsvpButton = document.getElementById("rsvp-button");

    let count = 3;

    const addParticipant = (person) => {

        const newParticipantParagraph = document.createElement('p');
    
        newParticipantParagraph.textContent = `🎟️ ${person.name} from ${person.where} has RSVP'd.`;
        participantList.appendChild(newParticipantParagraph);

        participantList.insertBefore(newParticipantParagraph, rsvpCountElement);
        
        count = count + 1;
        rsvpCountElement.textContent = `⭐ ${count} people have RSVP'd to this event!`;
        
    }


//Form Validation

const validateForm = (event) => {
    event.preventDefault();
    
    let containsErrors = false;
    const inputsToValidate = [firstNameInput, whereFromInput, emailInput];

    
    for(let i = 0; i < inputsToValidate.length; i++){
        const input = inputsToValidate[i];
        if(input.value.trim().length < 2){
            containsErrors = true;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    if (!emailInput.value.includes('@')) {
            containsErrors = true;
            emailInput.classList.add("error");
            alert("Put a valid email!");
        } else {
            emailInput.classList.remove("error");
        }

    
     const person = {
        name: firstNameInput.value.trim(),
        where: whereFromInput.value.trim(),
        email: emailInput.value.trim()
    }

    const toggleModal = (person) => {
        let modal = document.getElementById("success-modal");
        let modalContent = document.getElementById("modal-item");
        modal.style.display = "flex";

        let paragraphElement = modalContent.querySelector('p');
        paragraphElement.textContent = `Thanks for the RSVP, ${person.name}! Can't wait to see you there!`
       
        let rotateFactor = 0;
    
        let animateImageElement = document.getElementById("modal-img");

        const animateImage = () => {
            if(rotateFactor === 0){
                rotateFactor = -10;
            } else{
                rotateFactor = 0;
            }
            animateImageElement.style.transition = 'transform 0.5s ease-in-out';
            animateImageElement.style.transform = `rotate(${rotateFactor}deg)`;
        }
        
        let intervalId = setInterval(animateImage, 500);
        setTimeout(() => {
            modal.style.display = 'none';
            clearInterval(intervalId);
        }, 4000);
    }

    

        

   

    if(containsErrors === false){
        addParticipant(person);
        inputsToValidate.forEach(input => input.value = "");
        toggleModal(person);
       
    }
    
    
}

rsvpButton.addEventListener("click", validateForm);

});

