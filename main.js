const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all-clear');
const previousOperation = document.querySelector('.previous-display');
const currentOperation = document.querySelector('.current-display');
const perButton = document.querySelector('.per');
const squareRoot = document.querySelector('.square');

// const symbols = ['*', '+', '-', '÷', '%', 'x²']



class Calculator {
    constructor(previousOperation, currentOperation) {
        this.previousOperation = previousOperation
        this.currentOperation = currentOperation
        this.clear()
    }

    clear() {
        this.currentDisplay = '0'
        this.previousDisplay = '0'
        this.operation = undefined
    }

    delete() {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentDisplay.includes('.')) return
        this.currentDisplay = this.currentDisplay.toString() + number.toString() 
    }

    chooseOperation(operation) {
        if(this.currentDisplay === '') return
        if(this.previousDisplay !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousDisplay = this.currentDisplay
        this.currentDisplay = ''
    }

    percentage() {
        const num = parseFloat(this.currentDisplay)
        if (num) {
            return num / 100
        }
    }
    
    
    
    compute() {
        let computation
        const previous = parseFloat(this.previousDisplay)
        const current = parseFloat(this.currentDisplay)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = previous + current
                break
             case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            // case '%':
            //     computation = previous / 100
            //     break
            // case 'x²':
            //     computation = Math.pow(previous, 2)
            //     break
            default:
                return
        }
        this.currentDisplay = computation
        this.operation = undefined
        this.previousDisplay = ''
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperation.innerText = 
        this.getDisplayNumber(this.currentDisplay)
        if(this.operation != null) {
        this.previousOperation.innerText = 
        `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`
        } else {
            this.previousOperation.innerText = ''
        }
        
    }
}

const calculator = new Calculator (previousOperation, currentOperation)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

perButton.addEventListener('click', () => {
    calculator.percentage()
    calculator.updateDisplay()
})



 


