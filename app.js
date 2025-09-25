const buttons = document.querySelector('.btn-container')
const displayText = document.querySelector('.output')
const calcHistory = document.querySelector('.calculation')
const numArr = ['1','2','3','4','5','6','7','8','9','0']
const operatorArr = ['+', '-', '×', '÷']

let calculator = new Object();
calculator = {
    displayValue: '0',
    waitingforNextOperand: false,
    operator: null,
    didReverse: false,
}

function clear() {
    calculator.displayValue = '0';
    calculator.waitingforNextOperand = false;
    calculator.operator = null; 
    calculator.didReverse = false;
    displayText.innerHTML = '0';
    calcHistory.innerHTML = '';
}

function inputNumber(btnValue) {

    if(calculator.displayValue === '0'){
        calculator.displayValue = btnValue;
        calculator.waitingforNextOperand = false;
    } else if (calculator.waitingforNextOperand) {
        calculator.displayValue += btnValue;
    } else {
        calculator.displayValue += btnValue;
    }

    displayText.innerHTML = calculator.displayValue;
}

function inputOperationSign(btnValue) {

    calculator.operator = btnValue;
    calculator.displayValue += btnValue;
    calculator.waitingforNextOperand = true;

    displayText.innerHTML = calculator.displayValue;
    const sign = btnValue
    return sign;
}

function reverseNum(arrItem) {
    let reversedNum = "(" + -arrItem + ")"
    calculator.displayValue = calculator.displayValue.replace(arrItem, reversedNum)
    displayText.innerHTML = calculator.displayValue;
    calculator.didReverse = true;
}

function calculate(operationSign) {

    let operandArr = calculator.displayValue.split(operationSign);
    
    if (operandArr.length < 2) {
        console.log("Error: Missing second operand");
        return;
    }
    
    let num1 = parseFloat(operandArr[0].replace(/[()]/g, ''));
    let num2 = parseFloat(operandArr[1].replace(/[()]/g, ''));

    let result = '0';

    switch (operationSign) {
        case '+':
            result = String(Math.round((num1 + num2) * 1000) / 1000);
            break;
        case '-':
            result = String(Math.round((num1 - num2) * 1000) / 1000);
            break;
        case '÷':
            result = String(Math.round((num1 / num2) * 1000) / 1000);
            break;
        case '×':
            result = String(Math.round((num1 * num2) * 1000) / 1000);
            break;
    }

    let calculation = calculator.displayValue;
    calcHistory.innerHTML = calculation;
    calculator.displayValue = result; 
    displayText.innerHTML = result

    //reset didReverse boolean
    calculator.didReverse = false;
    //for debugging purposes
    console.log(operandArr)
    console.log(num1)
    console.log(num2)
}


buttons.addEventListener('click', (e) => { 

    let displayArr = calculator.displayValue.split(/\b[+\-÷×]/)

    let btnValue = e.target.innerHTML; 

    // make sure only buttons in the container are clickable
    if(!(e.target.tagName === 'BUTTON')) {
        return;
    } 

    // AC button to clear screen and bring calculator obj to default
    if(btnValue === 'AC') {
        clear();
    }

    // display first operand
    if(numArr.includes(btnValue)) {
        inputNumber(btnValue)
    }
    
    // Store the operation sign and store first operand
    if(operatorArr.includes(btnValue)) {
        inputOperationSign(btnValue)
    }
    
    if(btnValue === '+/-') {
        if(!(/[+\-÷×]/).test(calculator.displayValue)) {
            reverseNum(displayArr[0])
        } else {
            let parts = calculator.displayValue.split(calculator.operator)
            let secondOperand = parts[parts.length - 1]
            reverseNum(secondOperand)
        }
    }

    if(btnValue === '=') {
        calculate(calculator.operator)
    }

    console.log(calculator.displayValue)
    console.log(displayArr)
})