'use strict';

let num = prompt("Input num:");
let mess = "На ветке сидит " + num + " ";
let digit = num % 10;

if (num >= 10 && num <= 20) mess += "ворон";
else switch(digit) {
    case 1: {
        mess += "ворона";
        break;
    }
    case 2:
    case 3:
    case 4: {
        mess += "вороны";
        break;
    }
    default: {
        mess += "ворон";
        break;
    }
}

alert(mess);