const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output');
const signs = document.querySelectorAll('.sign')

let displayValue = 0
let numHandle = false
let operatorHandle = false
let equalHandle = false

//function for handling 
function clear() {
    output.textContent = ""
}

function setDefault() {
    output.textContent = "0"
    numHandle = false
    operatorHandle = false
    equalHandle = false
}

function handleNum(content) {
    // Case 1: Replace "0" or start fresh
    if (output.textContent === "0" || operatorHandle) {
        output.textContent = content;
        displayValue = content;
        operatorHandle = false; // Reset operator flag
        numHandle = true;
        return;
    }
    
    // Case 2: Add digit to existing number
    output.textContent += content;
    displayValue = output.textContent;
    numHandle = true;
}

function handleOperator(content) {
    // Don't allow operator if no number has been entered
    if (!numHandle) {
        return;
    }
    
    // If we already have an operator and user enters another one,
    // just replace the operator (like "5+" then user clicks "-")
    if (operatorHandle && !equalHandle) {
        // Remove last character (the previous operator) and add new one
        output.textContent = output.textContent.slice(0, -1) + content;
        return;
    }
    
    // Normal case: add operator to display
    output.textContent += content;
    operatorHandle = true;
    equalHandle = false;
}

btnContainer.addEventListener('click', function(e){
    
    if(!e.target.matches('button')) return;

    const buttonText = e.target.textContent;

    // Handle AC
    if(buttonText === "AC") {
        setDefault();
        return;
    }

    // Handle numbers (0-9)
    if ('0123456789'.includes(buttonText)) {
        handleNum(buttonText);
        return;
    }

    // Handle operators
    if ('+-×÷'.includes(buttonText)) {
        handleOperator(buttonText);
        return;
    }
});