function openModal() {
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
    var match = document.getElementById("match");
 
    confirmMyInput.onkeyup = function() {
        var passEqualsConfPass = (myInput.value == confirmMyInput.value);
        if (passEqualsConfPass) {
            match.classList.remove("invalid");
            match.classList.add("valid");
        } else {
            match.classList.remove("valid");
            match.classList.add("invalid");
        }
        enableButton(match);
    }
}


function enableButton(match) {  
    var button = document.getElementById('my_submit_button');
    var condition = (match.classList.contains("valid"));
    if (condition) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}