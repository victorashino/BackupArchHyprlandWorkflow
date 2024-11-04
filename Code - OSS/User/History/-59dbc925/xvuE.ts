let numeros: number[] = [20, 30, 40];
// let numeros: Array<number> = [20, 30, 40]
// let numeros: Array<number | string> = [20, 30, 40]
// let numeros: (number | string)[] = [20, 30, 40]

numeros.push(50);
numeros.unshift(10);
numeros.pop();
numeros.shift();

console.log(numeros);

// array imutável
let numeros_ro: ReadonlyArray<number> = [100, 200, 300];