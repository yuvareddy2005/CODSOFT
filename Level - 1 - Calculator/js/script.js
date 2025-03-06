// This file contains the JavaScript code that implements the calculator functionality.

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const buttons = Array.from(document.getElementsByClassName('button'));
let currentInput = '';
let history = [];

let inputField = document.getElementById('input');
let historyList = document.getElementById('historyList');
const interestOutputField = document.getElementById('interestOutput');

const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.57, CNY: 6.45, RUB: 73.21 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.74, CNY: 7.58, RUB: 86.14 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 99.74, CNY: 8.63, RUB: 97.77 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.010, CNY: 0.086, RUB: 0.98 },
    CNY: { USD: 0.16, EUR: 0.13, GBP: 0.12, INR: 11.57, RUB: 11.34 },
    RUB: { USD: 0.014, EUR: 0.012, GBP: 0.010, INR: 1.02, CNY: 0.088 }
};

buttons.map(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;


        if (value === 'C') {
            clearInput();
            updateDisplay();
        } else if (value === '=') {
            calculateResult();
            updateDisplay();
        } else {
            appendToInput(value);
            updateDisplay();
        }
    });
});

function updateDisplay() {
    display.innerText = inputField.value;
    outputField.value = inputField.value;
}

function updateHistory() {
    historyDisplay.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}

function appendToInput(value) {
    inputField.value += value;
}

function clearInput() {
    inputField.value = '';
}

function calculateResult() {
    try {
        let result = eval(inputField.value);
        addToHistory(inputField.value + ' = ' + result);
        inputField.value = result;
    } catch (error) {
        inputField.value = 'Error';
    }
}

function addToHistory(entry) {
    let listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

function clearHistory() {
    historyList.innerHTML = '';
}

function switchCalculator() {
    const calculatorSelect = document.getElementById('calculatorSelect');
    const selectedCalculator = calculatorSelect.value;

    document.getElementById('basicCalculator').style.display = 'none';
    document.getElementById('interestCalculator').style.display = 'none';
    document.getElementById('currencyConverter').style.display = 'none';
    document.getElementById('unitConverter').style.display = 'none';

    if (selectedCalculator === 'basic') {
        document.getElementById('basicCalculator').style.display = 'flex';
    } else if (selectedCalculator === 'interest') {
        document.getElementById('interestCalculator').style.display = 'flex';
    } else if (selectedCalculator === 'currency') {
        document.getElementById('currencyConverter').style.display = 'flex';
    } else if (selectedCalculator === 'unit') {
        document.getElementById('unitConverter').style.display = 'flex';
    }

    // Update all dropdowns to reflect the selected calculator
    document.querySelectorAll('select[id="calculatorSelect"]').forEach(select => {
        select.value = selectedCalculator;
    });
}

// Attach event listeners to all dropdowns
document.querySelectorAll('select[id="calculatorSelect"]').forEach(select => {
    select.addEventListener('change', switchCalculator);
});

function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    const interestType = document.getElementById('interestType').value;

    let interest;
    if (interestType === 'simple') {
        interest = (principal * rate * time) / 100;
    } else if (interestType === 'compound') {
        interest = principal * Math.pow((1 + rate / 100), time) - principal;
    }

    const interestResult = `${interest.toFixed(2)}`;
    document.getElementById('interestResult').innerText = interestResult;
    interestOutputField.value = interestResult;
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (fromCurrency === toCurrency) {
        document.getElementById('conversionResult').innerText = `Converted Amount: ${amount.toFixed(2)} ${toCurrency}`;
        return;
    }

    const convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
    document.getElementById('conversionResult').innerText = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}