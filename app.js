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

// function reverseNum(arrItem) {
//     let reversedNum = "(" + -arrItem + ")"
//     calculator.displayValue = calculator.displayValue.replace(arrItem, reversedNum)
//     displayText.innerHTML = calculator.displayValue;
//     calculator.didReverse = true;
// }

function back(arr) {
    calculator.displayValue = arr.slice(0, -1)
    displayText.innerHTML = calculator.displayValue
}

function calculate(operationSign) {

    const lastOperatorIndex = calculator.displayValue.lastIndexOf(operationSign);

    const num1String = calculator.displayValue.substring(0, lastOperatorIndex);
    const num2String = calculator.displayValue.substring(lastOperatorIndex + 1);
    
    const num1 = parseFloat(num1String.replace(/[()]/g, ''));
    const num2 = parseFloat(num2String.replace(/[()]/g, ''));

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

    if(btnValue === '↻') {
        back(calculator.displayValue)
    }

    // display first operand
    if(numArr.includes(btnValue)) {
        inputNumber(btnValue)
    }
    
    // Store the operation sign and store first operand
    if(operatorArr.includes(btnValue)) {
        if(!(/[\d][+\-÷×]/).test(calculator.displayValue)){
            inputOperationSign(btnValue)
        }
    }
    
    if (btnValue === '+/-') {
        if(calculator.displayValue === '0') return;
        if((/[+\-÷×]/).test(calculator.displayValue[calculator.displayValue.length-1])) return;

        // Check for the last occurrence of an operator to determine if we're
        // modifying the first or second operand.
        const lastOperatorIndex = Math.max(
            calculator.displayValue.lastIndexOf('+'),
            calculator.displayValue.lastIndexOf('-'),
            calculator.displayValue.lastIndexOf('×'),
            calculator.displayValue.lastIndexOf('÷')
        );

        let numToReverse;
        let reversedNum;

        if (lastOperatorIndex === -1) {
            // No operator found, so we're reversing the first operand.
            // The displayValue is the number we need to reverse.
            numToReverse = calculator.displayValue;
            reversedNum = `(${-parseFloat(numToReverse)})`;
            calculator.displayValue = reversedNum;

        } else {
            // Operator found, so we're reversing the second operand.
            // Get the substring after the last operator.
            numToReverse = calculator.displayValue.substring(lastOperatorIndex + 1);

            // Reverse the number and rebuild the display string.
            reversedNum = `(${-parseFloat(numToReverse)})`;
            calculator.displayValue =
                calculator.displayValue.substring(0, lastOperatorIndex + 1) + reversedNum;
        }

        displayText.innerHTML = calculator.displayValue;
        calculator.didReverse = true;
    }

    if(btnValue === '=') {
        calculate(calculator.operator)
    }

})