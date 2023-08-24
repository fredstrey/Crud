// Inverter uma string
public String reverseString(String s) {
    StringBuilder reversed = new StringBuilder();
    for (int i = s.length() - 1; i >= 0; i--) {
        reversed.append(s.charAt(i));
    }
    return reversed.toString();
}

// Verificar se uma string é um palíndromo
public boolean isPalindrome(String s) {
    s = s.toLowerCase().replaceAll(" ", "");
    return s.equals(reverseString(s));
}

// Verificar se um número é primo
public boolean isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

// Calcular fatorial de um número
public int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

public class Main
{
	public static void main(String[] args) {
	  
	    int n = 10;
        int antipenultimo = 0;
        int ultimo = 1;
        int atual = 0;
	for(int i=2;i<=n;i++){
	    atual = antipenultimo + ultimo;
	    antipenultimo=ultimo;
	    ultimo=atual;
	}
    System.out.println("O termo na posição " + n + " da sequência Fibonacci é: " + atual);
	}
}
