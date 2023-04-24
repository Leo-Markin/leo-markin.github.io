'use strict';

let age = prompt("Input age:");
let gender = prompt("Input gender:");

if (age <= 17) alert("Вам работать ещё рано — учитесь");

else if (gender == "male") {
    if (age <= 59) alert("Вам ещё работать и работать");
    else if (age <= 64) alert("Скоро пенсия!");
    else alert("Вам пора на пенсию");
}

else if (gender == "female") {
    if (age <= 54) alert("Вам ещё работать и работать");
    else if (age <= 59) alert("Скоро пенсия!");
    else alert("Вам пора на пенсию");
}

else alert("Да кто ты такой?");