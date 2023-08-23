// Inverter uma string
function reverseString(s) {
    return s.split('').reverse().join('');
}

// Verificar se uma string é um palíndromo
function isPalindrome(s) {
    s = s.toLowerCase().replace(/\s/g, '');
    return s === reverseString(s);
}
// Verificar se um número é primo
function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

// Calcular fatorial de um número
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
