# Inverter uma string
def reverse_string(s):
    return s[::-1]

# Verificar se uma string é um palíndromo
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Verificar se um número é primo
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Calcular fatorial de um número
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

# Encontrar o maior elemento em uma lista
def find_max(lst):
    max_value = float('-inf')
    for num in lst:
        if num > max_value:
            max_value = num
    return max_value

# Calcular a média de uma lista de números
def calculate_average(lst):
    if not lst:
        return 0
    return sum(lst) / len(lst)

# Contar a frequência de elementos em uma lista usando um dicionário
def count_elements(lst):
    freq = {}
    for item in lst:
        if item in freq:
            freq[item] += 1
        else:
            freq[item] = 1
    return freq

# Ler o conteúdo de um arquivo e contar o número de linhas
def count_lines(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
    return len(lines)

# Escrever em um arquivo
def write_to_file(filename, content):
    with open(filename, 'w') as file:
        file.write(content)
