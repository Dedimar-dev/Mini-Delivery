const knex = require('../bancodedados/conexao');
const {
  cadastroUsuarioSchema,
  atualizacaoUsuarioSchema
} = require('../validacoes/usuarioSchema');

const cadastroUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha,
    nome_lanchonete
  } = req.body

  try {
    await cadastroUsuarioSchema.validate(req.body);

    const emailExistente = knex('usuarios')
      .where({ email })
      .first()

    if (emailExistente) {
      return res.status(400).json({
        message:'Email já está sendo usado por outro usuário.'
      })
    }

      const usuarioCadastrado = knex('usuarios')
        .insert({
          nome,
          email,
          senha,
          nome_lanchonete
        });
    res.status(200).json({
      message: 'Cadastrado concluído com sucesso.'
    });
  } catch ({message}) {
    console.log(message)
  }

}

module.exports = {
  cadastroUsuario
}