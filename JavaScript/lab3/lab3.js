import { fib } from './lab2.js';

/**
 * Возвращает десятичную часть числа
 * @param {number} num - число, для которого нужно получить десятичную часть
 * @returns {number} - десятичная часть числа
 */
function getDecimal(num) {
    return parseFloat((num - Math.floor(num)).toFixed(5));
}

/**
 * Преобразует первую букву строки в верхний регистр
 * @param {string} str - строка, которую нужно преобразовать
 * @returns {string} - преобразованная строка
 */
function ucFirst(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

/**
 * Проверяет, содержит ли строка запрещенные слова "xxx" или "viagra"
 * @param {string} str - строка, которую нужно проверить
 * @returns {boolean} - true, если строка содержит запрещенные слова, иначе false
 */
function checkSpam(str) {
    if (str.toLowerCase().includes("xxx")) return true;
    if (str.toLowerCase().includes("viagra")) return true;
    return false;
}

/**
 * Обрезает строку до указанной длины и добавляет многоточие в конце, если строка была обрезана
 * @param {string} str - строка, которую нужно обрезать
 * @param {number} maxlength - максимальная длина строки
 * @returns {string} - обрезанная строка с многоточием в конце, если строка была обрезана
 */
function truncate(str, maxlength) {
    if (maxlength >= str.length) return str;
    return str.slice(0, maxlength - 1) + "\u2026";
}

/**
 * Преобразует строку из формата "var-text-string" в формат "varTextString"
 * @param {string} str - строка, которую нужно преобразовать
 * @returns {string} - преобразованная строка
 */
function camelize(str) {
    let check = str.search('-');
    while (check != -1) {
        str = str.slice(0, check) + ucFirst(str.slice(check+1));
        check = str.search('-');
    }
    return str;
}

/**
 * Возвращает массив первых n чисел Фибоначчи.
 * @param {number} n - Количество чисел Фибоначчи.
 * @returns {number[]} - Массив первых n чисел Фибоначчи.
 */
function fibs(n) {
    let result = [];
    for (let i = 0; i < n; i++) result.push(fib(i));
    return result;
}

/**
 * Сортирует массив методом быстрой сортировки.
 * @param {Array} arr - Массив, который нужно отсортировать.
 * @returns {Array} - Отсортированный массив.
 */
function quicksort(arr) {
    if (arr.length <= 1) return arr;
    let center = arr[0];
    let left = [];
    let right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < center) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quicksort(left), center, ...quicksort(right)];
}

/**
 * Сортирует массив методом быстрой сортировки и изменяет порядок элементов на обратный.
 * @param {Array} arr - Массив, который нужно отсортировать.
 * @returns {Array} - Отсортированный по убыванию массив.
 */
function arrReverseSorted(arr) {
    return quicksort(arr).reverse();
}

/**
 * Возвращает новый массив, содержащий только уникальные значения из исходного массива.
 * @param {Array} arr - Исходный массив.
 * @returns {Array} - Новый массив, содержащий только уникальные значения.
 */
function unique(arr) {
    const set = new Set(arr);
    return [...set];
}


// Для нормальной работы
window.getDecimal = getDecimal;
window.ucFirst = ucFirst;
window.checkSpam = checkSpam;
window.truncate = truncate;
window.camelize = camelize;
window.fibs = fibs;
window.arrReverseSorted = arrReverseSorted;
window.unique = unique;