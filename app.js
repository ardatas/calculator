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
    isResult: false,
    isSecondOperandNegated: false,
}

function clear() {
    calculator.displayValue = '0';
    calculator.waitingforNextOperand = false;
    calculator.operator = null; 
    calculator.isResult = false;
    displayText.innerHTML = '0';
    calcHistory.innerHTML = '';
    calculator.isSecondOperandNegated = false;
}

function inputNumber(btnValue) {

    if(calculator.displayValue === '0'){
        calculator.displayValue = btnValue;
        calculator.waitingforNextOperand = false;
    } else if (calculator.waitingforNextOperand) {
        calculator.displayValue += btnValue;
    } else if(calculator.isResult) {
        calculator.displayValue = btnValue;
        calculator.isResult = false;
    } else {
        calculator.displayValue += btnValue;
    }

    displayText.innerHTML = calculator.displayValue;
}

function inputOperationSign(btnValue) {

    calculator.operator = btnValue;
    calculator.displayValue += btnValue;
    calculator.waitingforNextOperand = true;
    calculator.isResult = false;

    displayText.innerHTML = calculator.displayValue;
    const sign = btnValue
    return sign;
}

function back(arr) {
    calculator.displayValue = arr.slice(0, -1)
    displayText.innerHTML = calculator.displayValue
}

function calculate(operationSign) {

    const binaryOperatorRegex = /(?<=[\d)])[+\-÷×]/g;    
    const lastOperatorIndex = calculator.displayValue.search(binaryOperatorRegex);

    const num1String = calculator.displayValue.substring(0, lastOperatorIndex);
    const num2String = calculator.displayValue.substring(lastOperatorIndex + 1);
    
    const num1 = parseFloat(num1String.replace(/[()]/g, ''));
    const num2 = parseFloat(num2String.replace(/[()]/g, ''));

    // if(!num1) return;
    // if(!num2) return;

    let result = '0';

    switch (operationSign) {
        case '+':
            result = String(Math.round((num1 + num2) * 1000) / 1000);
            break;
        case '-':
            result = String(Math.round((num1 - num2) * 1000) / 1000);
            break;
        case '÷':
            if(num2 === 0) {
                alert("Error: Cannot divide by Zero \nRestarting the calculator...")
                clear()
            }
            else result = String(Math.round((num1 / num2) * 1000) / 1000);
            break;
        case '×':
            result = String(Math.round((num1 * num2) * 1000) / 1000);
            break;
    }

    if(result === "NaN") {
        alert('Error: Not a number \nRestarting the calculator...')
        clear()
    } else {
        let calculation = calculator.displayValue;
        calcHistory.innerHTML = calculation;
        calculator.displayValue = result; 
        calculator.isResult = true;
        displayText.innerHTML = result
    
    }

    console.log(num1)
    console.log(num2)
    console.log(lastOperatorIndex)
}

function negateNum() {

    if(calculator.displayValue === '0') return;
    
    const isOperatorAtEnd = (/[+\-÷×]/).test(calculator.displayValue[calculator.displayValue.length-1]);
    if(isOperatorAtEnd) return;

    const binaryOperatorRegex = /(?<=[\d)])[+\-÷×]/g;    
    let operatorIndex = -1;
    let arr;
    
    while ((arr = binaryOperatorRegex.exec(calculator.displayValue)) !== null) {
        operatorIndex = arr.index   
    }
    
    let currentOperand;
    let prefix = '';

    // handle regarding the operand
    if (operatorIndex === -1) { 
        currentOperand = calculator.displayValue
    } else {
        currentOperand = calculator.displayValue.substring(operatorIndex+1)
        prefix = calculator.displayValue.substring(0, operatorIndex+1)
    }

    // negate
    const cleanedNum = parseFloat(currentOperand.replace(/[()]/g, ''))
    
    let newOperand; 

    if(currentOperand.startsWith('(') && currentOperand.endsWith(')')) {
        // Already in parentheses, extract the inner value and negate it
        const innerValue = currentOperand.slice(1, -1);
        const cleanedNum = parseFloat(innerValue);
        newOperand = String(-cleanedNum);
    } else {
        // Not in parentheses, apply original logic
        const cleanedNum = parseFloat(currentOperand.replace(/[()]/g, ''));
        
        if(cleanedNum < 0) {
            newOperand = String(-cleanedNum);
        } else {
            newOperand = `(${-cleanedNum})`
        }
    }

    calculator.displayValue = prefix + newOperand
    displayText.innerHTML = calculator.displayValue;
    calculator.isResult = false;

    console.log(arr)
}


buttons.addEventListener('click', (e) => { 

    // let displayArr = calculator.displayValue.split(/\b[+\-÷×]/)

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
        if(!(/[\d)][+\-÷×]/).test(calculator.displayValue)){
            inputOperationSign(btnValue)
        }
    }
    
    if (btnValue === '+/-') {
        negateNum()
    }

    if(btnValue === '=') {
        calculate(calculator.operator)
        calculator.waitingforNextOperand = false;
    }

    console.log(calculator.operator)
})