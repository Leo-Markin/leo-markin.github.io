'use strict';

let n = prompt("Введите количество строк:");
let animals = ["dog", "dog", "dog", "cat", "cat", "dog"];

for (let i = 0; i < n; i++) {
    let str = "";
    for (let j = 0; j < 6; j++) str += animals[j] + "\t";

    console.log(str);

    animals = [...animals.slice(1,6), ...animals.slice(0)];
}