class Calculator {
    constructor(upperDisplay, lowerDisplay){
        this.upperDisplay = upperDisplay
        this.lowerDisplay = lowerDisplay
        this.clear()
    }

    clear(){
        this.lowerNumber = ''
        this.upperNumber = ''
        this.operation = undefined
    }

    delete(){
        this.lowerNumber = this.lowerNumber.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.lowerNumber.includes('.')) return
        this.lowerNumber = this.lowerNumber.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.lowerNumber === '') return
        if(this.upperNumber !== ''){
            this.compute()
        }
        this.operation = operation
        this.upperNumber = this.lowerNumber
        this.lowerNumber = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.upperNumber)
        const current = parseFloat(this.lowerNumber)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.lowerNumber = computation
        this.operation = undefined
        this.upperNumber = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerNumber)){
            integerDisplay = ''
        }else{
            integerDisplay = integerNumber.toLocaleString('en-ZA', {
                maximumFractionDigits: 0 })
        }
        if(decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.lowerDisplay.innerText = this.getDisplayNumber(this.lowerNumber)
        if(this.operation != null){
        this.upperDisplay.innerText = `${this.getDisplayNumber(this.upperNumber)} ${this.operation}`
        } else {
            this.upperDisplay.innerText = ''
        }
    }
}


const btnNumbers = document.querySelectorAll('.number')
const btnOperations = document.querySelectorAll('.operation')
const btnEquals = document.querySelector('#equals')
const btnDelete = document.querySelector('#delete')
const btnAllClear = document.querySelector('#all-clear')
const upperDisplay = document.querySelector('#upper-display')
const lowerDisplay = document.querySelector('#lower-display')

const calculator = new Calculator(upperDisplay, lowerDisplay)

btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

btnOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

btnEquals.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

btnAllClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

btnDelete.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})