export type Operations = "+" | "-" | "/" | "*";

export default class Calculator {
    private readonly _operations: Operations[] = ["+", "-", "*", "/"];
    private _leftOperand: string = "";
    private _rightOperand: string = "";
    private _operator: Operations | null = null; 
    public currentInput: string = "";
    public oldInput: string = "";
    public lastRecord: string = "";

    constructor() {
        this.currentInput = "";
        this.oldInput = "";
        this.lastRecord = "";
    }

    public input(input: string): void {
        if (input === ".") {
            if (this.currentInput.includes(".")) return; // if we have already input "." - don't input again 
            if (this.currentInput.length === 0) this.currentInput = "0"; // if Input is empty - add 0 at the beginning
        }
        if (this._operations.includes(input as Operations)) { // input one of operators (+, -, /, *)
            if (this.currentInput) { // if we have already number in Input
                if (this._operator) { // and have chosen operator
                    this._rightOperand = this.currentInput; 
                    this.calculate();
                    this._operator = input as Operations;
                    this.oldInput = this._leftOperand + this._operator;
                    this.currentInput = "";
                    return;
                }
                if (this._operator === null) { // if we don't have chosen operator
                    this.oldInput = this.currentInput + input;
                    this._leftOperand = this.currentInput;
                    this._operator = input as Operations;
                    this.currentInput = "";
                    return;
                }
            } else return; // if we input operator, but have nothing in Input - don't input operator
        }
        if (this.currentInput.length < 16) {
            if (this._leftOperand && this._operator) {
                this._rightOperand = this.currentInput + input;
            }
            this.currentInput += input;
        }
    }

    public clear(): void {
        this.currentInput = "";
        this.oldInput = "";
        this._leftOperand = "";
        this._rightOperand = "";
        this._operator = null;
    }

    public calculate(): void {   
        let result: number = 0;

        function add(a: number, b: number) {
            return parseFloat((a + b).toFixed(10));
        }
        function subtract(a: number, b: number) {
            return parseFloat((a - b).toFixed(10));
        }
        function multiply(a: number, b: number) {
            return parseFloat((a * b).toFixed(10));
        }
        function divide(a: number, b: number) {
            if (b !== 0) return parseFloat((a / b).toFixed(10));
            else return 0;
        }

        switch (this._operator) {
            case "+":
                result = add(Number(this._leftOperand), Number(this._rightOperand));
                break;
            case "-":
                result = subtract(Number(this._leftOperand), Number(this._rightOperand));
                break;
            case "*":
                result = multiply(Number(this._leftOperand), Number(this._rightOperand));
                break;
            case "/":
                result = divide(Number(this._leftOperand), Number(this._rightOperand));
                break;
        }

        this.lastRecord = `${this._leftOperand} ${this._operator} ${this._rightOperand} = ${result}`;
        this._leftOperand = `${result}`;
        this._rightOperand = "";
        this._operator = null;
        this.oldInput = "";
        this.currentInput = `${result}`;
    }

    public changeSign(): void {
        if (this.currentInput.length !== 0) {
            let changedInput = this.currentInput;
            if (this.currentInput[0] === "-") 
                changedInput = this.currentInput.slice(1);
            else 
                changedInput = "-" + this.currentInput;

            if (this.currentInput === this._leftOperand) 
                this._leftOperand = changedInput;
            else if (this.currentInput === this._rightOperand)
                this._rightOperand = changedInput;

            this.currentInput = changedInput;
        }
    }

    public toPercent(): void {
        if (this.currentInput.length !== 0) {
            let changedInput = Number(this.currentInput);
            if (changedInput >= 1 || changedInput <= -1)
                changedInput = Number(this.currentInput) / 100;

            if (this.currentInput === this._leftOperand)
                this._leftOperand = `${changedInput}`;
            else if (this.currentInput === this._rightOperand)
                this._rightOperand = `${changedInput}`;

            this.currentInput = `${changedInput}`;
        }
    }

    public restoreHistory(record: string): void {
        this._leftOperand = record;
        this._rightOperand = "";
        this._operator = null;
        this.oldInput = "";
        this.currentInput = record;
    }
}