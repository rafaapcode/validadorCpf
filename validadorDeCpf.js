function Cpf(cpf) {
    Object.defineProperty(this, 'cpfFormatado', {
        enumerable: true,
        get: function () {
            return cpf.replace(/\D+/g, '');
        }
    });
}

Cpf.prototype.validacao = function () {
    if (typeof this.cpfFormatado === 'undefined') return false;
    if (this.cpfFormatado.length > 11) return false;
    if (this.isSequence()) return false;

    let cpfParcial = this.cpfFormatado.slice(0, -2);
    let digits1 = this.digitos(cpfParcial);
    let digits2 = this.digitos(cpfParcial + digits1);

    let novoCpf = cpfParcial + digits1 + digits2;

    return novoCpf === this.cpfFormatado;
};

Cpf.prototype.isSequence = function () {
    return this.cpfFormatado[0].repeat(this.cpfFormatado.length) === this.cpfFormatado;
};

Cpf.prototype.digitos = function (cpfParcial) {
    const arrCpf = Array.from(cpfParcial);
    let regresso = arrCpf.length + 1;
    const soma = arrCpf.reduce((acc, val) => {
        acc += (regresso * Number(val));

        regresso--;

        return acc;

    }, 0);

    let digitos = 11 - (soma % 11);

    return digitos > 9 ? "0" : String(digitos);
};

const cpf1 = new Cpf("181.602.130-00");
const cpf2 = new Cpf("787.958.832-90");



console.log(cpf1.validacao());
console.log(cpf2.validacao());


