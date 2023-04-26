'use strict';

let n = prompt("Введите n:");

for (let c = 2; c <= n; c++) {
    let sq = Math.sqrt(c);
    sq = Math.floor(sq);
    let flag = false;

    for (let i = 2; i <= sq; i++) {
        if (c % i == 0) {
            flag = true;
            break;
        }
    }

    if (!flag) console.log(c);
}