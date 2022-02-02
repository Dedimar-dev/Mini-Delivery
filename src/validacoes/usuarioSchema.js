const yup = require('./yup');

const cadastroUsuarioSchema = yup.object().shape({
  nome: yup
    .string()
    .required(),

  email: yup
    .string()
    .email()
    .required(),

  senha: yup
    .string()
    .min(6)
    .required(),

  nome_loja: yup
    .string()
    .required()
});

const atualizacaoUsuarioSchema = yup.object().shape({
  nome: yup
    .string()
    .required(),

  email: yup
    .string()
    .email()
    .required(),

  senha: yup
    .string()
    .min(6),

  nome_loja: yup
    .string()
});

module.exports = {
  cadastroUsuarioSchema,
  atualizacaoUsuarioSchema

}