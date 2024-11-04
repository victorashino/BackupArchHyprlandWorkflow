let dados = {
    nome: "Victor",
    idade: 20,
    status: true,
    ola: () => { console.log("Olá") },
    info: (p: string) => { console.log(p) }
}

console.log(dados);

// só consigo pegar os valores se o tipo for any ou tiver varios tipos
console.log(dados.nome);

console.log(typeof(dados));
dados.ola();
dados.info("Info")