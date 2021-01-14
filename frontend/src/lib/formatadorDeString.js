export const formatarParaReal = (str) => {
    return `R$ ${str}`;
} 

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const obterMesDeDate = (date) => {
    return meses[date.getMonth()];
}

export const obterMes = (int) => meses[int];

const formatadorDeString = { formatarParaReal, obterMesDeDate, obterMes };
export default formatadorDeString;