const yup = require('./yup');

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),

  senha: yup
    .string()
    .min(6)
    .required()
})

module.exports = loginSchema
