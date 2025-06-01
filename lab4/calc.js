let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '%'];

const out = document.querySelector('.calc-screen p');

document.querySelector('.ac').onclick = () => {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
};

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;

    if (key === '+/-') {
        if (b === '' && sign === '') {
            a = a.startsWith('-') ? a.slice(1) : '-' + a;
            out.textContent = a;
        } else {
            b = b.startsWith('-') ? b.slice(1) : '-' + b;
            out.textContent = b;
        }
        return;
    }

    out.textContent = '';

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    if (action.includes(key)) {
        
        if (key === '%' && sign === '' && a !== '') {
            a = String(+a / 100);
            out.textContent = a;
            return;
        }
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;
    }
    
    if (key === '=') {
        if (b === '') b = a;
        
        if (sign === '%') {
            b = String((+a * +b) / 100);
            sign = ''; 
        }
        switch (sign) {
            case "+":
                a = String(+a + +b);
                break;
            case "-":
                a = String(+a - +b);
                break;
            case "X":
                a = String(+a * +b);
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'Помилка!';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = String(+a / +b);
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }
};