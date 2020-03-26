module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); // O map percorre um array e para cada um das informações que tem dentro desse vetor podemos executar alguma coisa
}