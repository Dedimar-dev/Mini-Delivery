const yup = require('./yup');

const cadastroProdutoSchema = yup.object().shape({
  nome: yup
    .string()
    .required(),

  descricao: yup
    .string(),

  valor: yup
    .number()
    .required(),

  quantidade: yup
    .number()
    .required()
});

const atualizacaoProdutoSchema = yup.object().shape({
  nome: yup
    .string()
    .required(),

  descricao: yup
    .string(),

  valor: yup
    .number()
    .required(),

  quantidade: yup
    .string()
    .required()
});

module.exports = {
  cadastroProdutoSchema,
  atualizacaoProdutoSchema
}