class Aluno {
    userName: string | null = null;
    course: string | null = null;

    constructor(userName: string, course: string) {
        this.userName = userName;
        this.course = course;
    }
}

let c1 = new Aluno("Victor", "Typescript");
console.log(c1.userName);
console.log(c1.course);