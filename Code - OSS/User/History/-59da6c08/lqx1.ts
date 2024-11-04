enum dias {
    domingo = 1,
    segunda = 2,
    terca = 3,
    quarta = 4,
    quinta = 5,
    sexta = 6,
    sabado = 7,
}

console.log(dias.domingo)
console.log(dias["domingo"])
console.log(dias[1])

const d = new Date();
console.log(d)
console.log(d.getDate())