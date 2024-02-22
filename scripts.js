function updateTotal() {
    const size = document.getElementById('size').value;
    const pizzaNumbersInput = document.getElementById('pizzaNumbers');
    const drink = document.getElementById('drink').value;
    const drinkQuantity = parseInt(document.getElementById('drinkQuantity').value) || 0;

    // Remover caracteres não numéricos, exceto vírgulas e espaços
    let sanitizedInput = pizzaNumbersInput.value.replace(/[^0-9,\s]/g, '');

    // Adicionar vírgula automaticamente após dois caracteres e espaço após a vírgula
    sanitizedInput = sanitizedInput.replace(/(\d{2})(?=\d)/g, '$1, ');

    pizzaNumbersInput.value = sanitizedInput;

    const pizzaNumbers = sanitizedInput
        .replace(/\s+/g, '')  // Remover espaços
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

    let total = 0;

    pizzaNumbers.forEach(number => {
        if (size === 'broto') {
            if (number >= 1 && number <= 10) {
                total += 14;
            } else if (number >= 11 && number <= 20) {
                total += 16;
            } else if (number >= 21 && number <= 32) {
                total += 20;
            } else if (number >= 33 && number <= 51) {
                total += 22;
            }
        } else if (size === 'grande') {
            if (number >= 1 && number <= 10) {
                total += 25;
            } else if (number >= 11 && number <= 20) {
                total += 27;
            } else if (number >= 21 && number <= 32) {
                total += 30;
            } else if (number >= 33 && number <= 51) {
                total += 35;
            }
        }
    });

    switch (drink) {
        case 'guarana':
        case 'limao':
        case 'laranja':
        case 'tubaina':
            total += 7 * drinkQuantity;
            break;
        case 'coca':
            total += 12 * drinkQuantity;
            break;
    }

    document.getElementById('total').innerText = total.toFixed(2);
}

// Adicionar ouvintes de eventos para lidar com a entrada do usuário
document.getElementById('pizzaNumbers').addEventListener('input', updateTotal);
document.getElementById('drinkQuantity').addEventListener('input', updateTotal);
document.getElementById('size').addEventListener('change', updateTotal);
