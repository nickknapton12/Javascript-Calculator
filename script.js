class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        negativeNum = false
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, this.currentOperand.length - 1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if(number == 'π') this.currentOperand += Math.PI
        else{ this.currentOperand = this.currentOperand.toString() + number.toString()}
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    chooseOperationTwo(operation){
        if(this.currentOperand === '') return
        switch(operation){
            case '√':
            this.currentOperand = Math.sqrt(this.currentOperand)
            break

            case 'x2':
            this.currentOperand = Math.pow(this.currentOperand,2)
            break

            default:
                return
        }
    }

    switchSigns(){
        this.currentOperand *= -1
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+': 
            computation = prev + current
            
            break
            
            case '-': 
            computation = prev - current
            break

            case '÷': 
            computation = prev / current
            break

            case '*': 
            computation = prev * current
            break

            case 'xn':
            computation = Math.pow(prev,current)
            break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this. previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        console.log(this.currentOperandTextElement.innerText)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const positiveOrNegativeNumber = document.querySelector('[data-positiveNegativeButton]')
const operationTwo = document.querySelectorAll('[data-operation-two]')
var finishedOperation = false;
var negativeNum = false

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(finishedOperation == false){
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        }else{
            calculator.clear()
            finishedOperation = false;
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        }
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        finishedOperation = false
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

operationTwo.forEach(button => {
    button.addEventListener('click', () => {
        finishedOperation = true
        calculator.chooseOperationTwo(button.innerText)
        calculator.updateDisplay()
    })
})


document.addEventListener("keydown", () =>{
    console.log(event.key)
    if(event.key == '/'){
        finishedOperation = false
        calculator.chooseOperation('÷')
        calculator.updateDisplay()
    }
    else if(event.key == '+' || event.key == '-' || event.key == '*'){
        finishedOperation = false
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    else if(event.key == '0' ||event.key == '1' || event.key == '2' ||event.key == '3' ||event.key == '4' ||event.key == '5' ||event.key == '6' ||event.key == '7' ||event.key == '8' ||event.key == '9' ){
        if(finishedOperation == false){
            calculator.appendNumber(event.key)
            calculator.updateDisplay()
        }
        else{
            calculator.clear()
            calculator.updateDisplay()
            finishedOperation = false;
            calculator.appendNumber(event.key)
            calculator.updateDisplay()
        }
    }
    else if(event.key == 'Enter'){
        calculator.compute()
        calculator.updateDisplay()
        finishedOperation = true;
    }
    else if(event.key == 'Backspace'){
        if(finishedOperation == true){
            calculator.clear()
            calculator.updateDisplay()
            finishedOperation = false
        }else{
            calculator.delete()
            calculator.updateDisplay()
        }
    }
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    finishedOperation = true
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
    finishedOperation = false
})

deleteButton.addEventListener('click', button => {
    if(finishedOperation == true){
        calculator.clear()
        calculator.updateDisplay()
        finishedOperation = false
    }else{
        calculator.delete()
        calculator.updateDisplay()
    }
})

positiveOrNegativeNumber.addEventListener('click', button => {
    if(negativeNum != true){
        calculator.switchSigns()
        calculator.updateDisplay()
        negativeNum = true
    }
})
