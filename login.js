function openModal() {
    /* Note that you do NOT have to do a document.getElementById anywhere in this exercise. Use the elements below */
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var match = document.getElementById("match");


    /* TODO Question 1.3: Starts here */
    confirmMyInput.onkeyup = function() {
        // Validate password and confirmPassword
        var passEqualsConfPass = (myInput.value == confirmMyInput.value); // TODO: Change this to the condition that needs to be checked so that the text entered in password equals the text in confirm password
        if (passEqualsConfPass) {
            match.classList.remove("invalid");
            match.classList.add("valid");
        } else {
            match.classList.remove("valid");
            match.classList.add("invalid");
        }
        /* TODO Question 1.3: Starts here */

        // Disable or Enable the button based on the elements in classList
        enableButton(match);
    }
}


function enableButton(match) {
    // TODO: Clear this function for students to implement    
    var button = document.getElementById('my_submit_button');
    var condition = (match.classList.contains("valid")); // TODO: Replace false with the correct condition
    if (condition) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}


function onClickFunction() {
    alert("Hey! I'm all green! Well done.")
}