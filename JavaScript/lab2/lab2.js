/**
 * 
 * @param {*} x 
 * @param {*} n 
 * @returns 
 */
function pow(x,n) { // x - число возводимое в степень; n - степень
    let res = 1;
    if (n >= 0) for (let i = 0; i < n; i++) res *= x; // возведение в неотрицательную степень
    else for (let i = 0; i > n; i--) res /= x;  // возведение в отрицательную степень
    return res;
}

/**
 * 
 * @param {*} n 
 * @returns 
 */
function sumTo(n) { // n - число до которого нужно просуммировать ряд n;
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i; // суммирование
    return sum;
}

function factorial(n) { // n - число, факториал которого надо найти
    if (BigInt(n) === 0n) return 1n; // 0! = 1
    else return BigInt(n) * factorial(n-1);
}

function fib(n) { // n - номер числа фибоначчи
    let a = 0n, b = 1n, c;
    if (n == 0) return a; // 0ое число - 0
    if (n == 1) return b; // 1ое число - 1
    for (let i = 1; i < n; i++) { // вычисляем n-ое число фибоначчи
        c = a + b;
        a = b;
        b = c;
    }
    return c;
}

function compare(x) { // x - сравниваемое число
    return function(y) { // возвращаем анонимную функцию со сравнением. y - второе сравниваемое число
        if (y > x) return true;
        if (y < x) return false;
        return null;
    }
}

function sum(...args) { // args - n-ое кол-во аргументов
    if (!args.length) return 0; //  если массив пустой, то сумма равна 0
    let s = args.reduce(function (currentSum, currentNum) { // складываем все элементы массива в currentSum. Аналог алгоритма accumulate() из C++
        return currentSum + currentNum;
    });
    return s;
}