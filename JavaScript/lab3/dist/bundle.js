/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lab2.js":
/*!*****************!*\
  !*** ./lab2.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fib\": () => (/* binding */ fib)\n/* harmony export */ });\n/**\r\n * pow(x,n) Возведение в степень\r\n * @param {*number} x Число возводимое в степень\r\n * @param {*number} n Степень\r\n * @returns {*number} Число в степени\r\n */\r\nfunction pow(x,n) { // x - число возводимое в степень; n - степень\r\n    let res = 1;\r\n    if (n >= 0) for (let i = 0; i < n; i++) res *= x; // возведение в неотрицательную степень\r\n    else for (let i = 0; i > n; i--) res /= x;  // возведение в отрицательную степень\r\n    return res;\r\n}\r\n\r\n/**\r\n * Сумма ряда n\r\n * @param {*number} n Число до которого идёт ряд\r\n * @returns {*number} Сумма ряда\r\n */\r\nfunction sumTo(n) { // n - число до которого нужно просуммировать ряд n;\r\n    let sum = 0;\r\n    for (let i = 1; i <= n; i++) sum += i; // суммирование\r\n    return sum;\r\n}\r\n\r\n/**\r\n * Факториал числа\r\n * @param {*number} n Число факториал которого надо найти\r\n * @returns {*BigInt} Факториал числа\r\n */\r\nfunction factorial(n) { // n - число, факториал которого надо найти\r\n    if (BigInt(n) === 0n) return 1n; // 0! = 1\r\n    else return BigInt(n) * factorial(n-1);\r\n}\r\n\r\n/**\r\n * Поиск числа Фибоначчи\r\n * @param {*number} n Номер числа фибоначчи \r\n * @returns {*BigInt} Число фибоначчи\r\n */\r\nfunction fib(n) { // n - номер числа фибоначчи\r\n    let a = 0n, b = 1n, c;\r\n    if (n == 0) return a; // 0ое число - 0\r\n    if (n == 1) return b; // 1ое число - 1\r\n    for (let i = 1; i < n; i++) { // вычисляем n-ое число фибоначчи\r\n        c = a + b;\r\n        a = b;\r\n        b = c;\r\n    }\r\n    return c;\r\n}\r\n\r\n/**\r\n * Сравнение чисел\r\n * @param {*number} x Первое число\r\n * @returns {*function} возвращаем анонимную функцию со сравнением. y - второе сравниваемое число\r\n */\r\nfunction compare(x) { // x - сравниваемое число\r\n    return function(y) {\r\n        if (y > x) return true;\r\n        if (y < x) return false;\r\n        return null;\r\n    }\r\n}\r\n\r\n/**\r\n * Нахождение суммы чисел\r\n * @param  {...any} args Некоторое количество чисел\r\n * @returns {*number} Сумма\r\n */\r\nfunction sum(...args) { // args - n-ое кол-во аргументов\r\n    if (!args.length) return 0; //  если массив пустой, то сумма равна 0\r\n    let s = args.reduce(function (currentSum, currentNum) { // складываем все элементы массива в currentSum. Аналог алгоритма accumulate() из C++\r\n        return currentSum + currentNum;\r\n    });\r\n    return s;\r\n}\n\n//# sourceURL=webpack:///./lab2.js?");

/***/ }),

/***/ "./lab3.js":
/*!*****************!*\
  !*** ./lab3.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lab2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lab2.js */ \"./lab2.js\");\n\r\n\r\n/**\r\n * Возвращает десятичную часть числа\r\n * @param {number} num - число, для которого нужно получить десятичную часть\r\n * @returns {number} - десятичная часть числа\r\n */\r\nfunction getDecimal(num) {\r\n    return parseFloat((num - Math.floor(num)).toFixed(5));\r\n}\r\n\r\n/**\r\n * Преобразует первую букву строки в верхний регистр\r\n * @param {string} str - строка, которую нужно преобразовать\r\n * @returns {string} - преобразованная строка\r\n */\r\nfunction ucFirst(str) {\r\n    return str.slice(0,1).toUpperCase() + str.slice(1);\r\n}\r\n\r\n/**\r\n * Проверяет, содержит ли строка запрещенные слова \"xxx\" или \"viagra\"\r\n * @param {string} str - строка, которую нужно проверить\r\n * @returns {boolean} - true, если строка содержит запрещенные слова, иначе false\r\n */\r\nfunction checkSpam(str) {\r\n    if (str.toLowerCase().includes(\"xxx\")) return true;\r\n    if (str.toLowerCase().includes(\"viagra\")) return true;\r\n    return false;\r\n}\r\n\r\n/**\r\n * Обрезает строку до указанной длины и добавляет многоточие в конце, если строка была обрезана\r\n * @param {string} str - строка, которую нужно обрезать\r\n * @param {number} maxlength - максимальная длина строки\r\n * @returns {string} - обрезанная строка с многоточием в конце, если строка была обрезана\r\n */\r\nfunction truncate(str, maxlength) {\r\n    if (maxlength >= str.length) return str;\r\n    return str.slice(0, maxlength - 1) + \"\\u2026\";\r\n}\r\n\r\n/**\r\n * Преобразует строку из формата \"var-text-string\" в формат \"varTextString\"\r\n * @param {string} str - строка, которую нужно преобразовать\r\n * @returns {string} - преобразованная строка\r\n */\r\nfunction camelize(str) {\r\n    let check = str.search('-');\r\n    while (check != -1) {\r\n        str = str.slice(0, check) + ucFirst(str.slice(check+1));\r\n        check = str.search('-');\r\n    }\r\n    return str;\r\n}\r\n\r\n/**\r\n * Возвращает массив первых n чисел Фибоначчи.\r\n * @param {number} n - Количество чисел Фибоначчи.\r\n * @returns {number[]} - Массив первых n чисел Фибоначчи.\r\n */\r\nfunction fibs(n) {\r\n    let result = [];\r\n    for (let i = 0; i < n; i++) result.push((0,_lab2_js__WEBPACK_IMPORTED_MODULE_0__.fib)(i));\r\n    return result;\r\n}\r\n\r\n/**\r\n * Сортирует массив методом быстрой сортировки.\r\n * @param {Array} arr - Массив, который нужно отсортировать.\r\n * @returns {Array} - Отсортированный массив.\r\n */\r\nfunction quicksort(arr) {\r\n    if (arr.length <= 1) return arr;\r\n    let center = arr[0];\r\n    let left = [];\r\n    let right = [];\r\n    for (let i = 1; i < arr.length; i++) {\r\n        if (arr[i] < center) left.push(arr[i]);\r\n        else right.push(arr[i]);\r\n    }\r\n    return [...quicksort(left), center, ...quicksort(right)];\r\n}\r\n\r\n/**\r\n * Сортирует массив методом быстрой сортировки и изменяет порядок элементов на обратный.\r\n * @param {Array} arr - Массив, который нужно отсортировать.\r\n * @returns {Array} - Отсортированный по убыванию массив.\r\n */\r\nfunction arrReverseSorted(arr) {\r\n    return quicksort(arr).reverse();\r\n}\r\n\r\n/**\r\n * Возвращает новый массив, содержащий только уникальные значения из исходного массива.\r\n * @param {Array} arr - Исходный массив.\r\n * @returns {Array} - Новый массив, содержащий только уникальные значения.\r\n */\r\nfunction unique(arr) {\r\n    const set = new Set(arr);\r\n    return [...set];\r\n}\r\n\r\n\r\nwindow.getDecimal = getDecimal;\r\nwindow.ucFirst = ucFirst;\r\nwindow.checkSpam = checkSpam;\r\nwindow.truncate = truncate;\r\nwindow.camelize = camelize;\r\nwindow.fibs = fibs;\r\nwindow.arrReverseSorted = arrReverseSorted;\r\nwindow.unique = unique;\n\n//# sourceURL=webpack:///./lab3.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lab3.js");
/******/ 	
/******/ })()
;