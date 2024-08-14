// Importações:
const isArr = require('./isArr'); const isBoo = require('./isBoo'); const isNum = require('./isNum'); const is_ = require('./is_');

// Nome da função:
const funName = () => `checkRepeatedElements`;

// Nome completo da função:
const funAllName = () => `const ${funName()} = (arrArrayOfElements, booCompareTypes = true) => {...};`;

// Descrição da função:
const funDesc = () => `--- Função que verifica quantas vezes cada elemento de um array se repete:`;

// Ajuda da função:
const funHelp = () => `${funDesc()}

${funAllName()}

- O primeiro parâmetro é obrigatório, deve ser do tipo array e indica o array a serem verificados os elementos que se repetem.
- O segundo parâmetro é opcional, deve ser do tipo boolean, indica se os tipos dos elementos também serão comparados e deve seguir algum desses padrões:
'true' para comparar os valores junto dos tipos;
'false' para comparar apenas os valores, ignorando os tipos.

Exemplo de uso:
console.log(${funName()}([1, '1', 1, '2', 3]))

Exemplo de retorno:
[
  [ 1, 3, [ 'number', 'string' ] ],
  [ '2', 1, [ 'string' ] ],
  [ 3, 1, [ 'number' ] ]
]

O retorno sempre será um array de arrays.`;

const checkRepeatedElements = (arrArrayOfElements, booCompareTypes = true) => {
  if (!isArr(arrArrayOfElements || arrArrayOfElements.length < 1)) {
    console.error(`ERRO FUNÇÃO: ${funAllName()}`);
    console.error(`ERRO: Há algum problema com o primeiro parâmetro ('${arrArrayOfElements}' não é do tipo array OU '${arrArrayOfElements}' não possui nenhum elemento).`);
    console.error(`ERRO: Use '${funName()}.help()' para detalhes.`);
    return [ [ null ] ];
  };
  if (!isBoo(booCompareTypes)) {
    booCompareTypes = true;
  };

  const ArrElementosEContagem = [];

  const ObjElementosEContagem = {};
  for (let i = 0; i < arrArrayOfElements.length; i++) {
    const AnyElemento = arrArrayOfElements[i];
    const StrElementoParseOriginal = JSON.stringify(AnyElemento);
    let strElementoParse = StrElementoParseOriginal;
    const ArrTiposDoElemento = is_(AnyElemento)[1];
    const ObjTiposDoElemento = {};
    for (let i = 0; i < ArrTiposDoElemento.length; i++) {
      const StrTipoElemento = ArrTiposDoElemento[i];
      ObjTiposDoElemento[StrTipoElemento] = StrTipoElemento;
    };

    if (booCompareTypes === false) {
      if (isNum(AnyElemento)) {
        strElementoParse = JSON.stringify(AnyElemento.toString());
      };
    };

    if (!ObjElementosEContagem[strElementoParse]) {
      ObjElementosEContagem[strElementoParse] = [AnyElemento, Number(ArrElementosEContagem.length), ObjTiposDoElemento];
      ArrElementosEContagem.push([AnyElemento, 1, ArrTiposDoElemento, StrElementoParseOriginal]);
    } else {
      const intIndexExistente = ObjElementosEContagem[strElementoParse][1];
      ArrElementosEContagem[intIndexExistente][1] = ArrElementosEContagem[intIndexExistente][1] + 1;
      for (let i = 0; i < ArrTiposDoElemento.length; i++) {
        const StrTipoElemento = ArrTiposDoElemento[i];
        if (!ObjElementosEContagem[strElementoParse][2][StrTipoElemento]) {
          ObjElementosEContagem[strElementoParse][2][StrTipoElemento] = StrTipoElemento;
          ArrElementosEContagem[intIndexExistente][2].push(StrTipoElemento);
        };
      };
    };
  };

  return ArrElementosEContagem;
};

checkRepeatedElements.nome = funAllName;
checkRepeatedElements.desc = funDesc;
checkRepeatedElements.help = funHelp;

module.exports = checkRepeatedElements;