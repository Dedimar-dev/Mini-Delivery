const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt')

const {
  cadastroUsuarioSchema,
  atualizacaoUsuarioSchema
} = require('../validacoes/usuarioSchema');

const cadastroUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha,
    nome_loja
  } = req.body

  try {
    await cadastroUsuarioSchema.validate(req.body);

    const emailExistente = await knex('usuarios')
      .where({ email })
      .first();

    if (emailExistente) {
      return res.status(400).json({
        message: 'Email já está sendo usado por outro usuário.'
      });
    }

   const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { rowCount } = await knex('usuarios')
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
        nome_loja
      });

    if (rowCount === 0) {
      res.status(200).json({
        message: 'Usuário não foi cadastrado.'
      });
    }
    res.status(200).json({
      message: 'Usuário cadastrado com sucesso.'
    });
  } catch ({ message }) {
    return res.status(400).json({ message })
  }

}

const atualizarUsuario = async (req, res) => {
  let {
    nome,
    email,
    senha,
    nome_loja
  } = req.body

  const usuario = req.usuario;

  try {
    await atualizacaoUsuarioSchema.validate(req.body);

    if (email !== usuario.email) {
      const emailExistente = await knex('usuarios')
        .where({ email })
        .first();

      if (emailExistente) {
        return res.status(400).json({
          message: 'Email já está sendo usado por outro usuário.'
        });
      }
    }

    if (senha) {
      senha = await bcrypt.hash(senha, 10);
    }

    const { rowCount } = await knex('usuarios')
      .update({
        nome,
        email,
        senha: senha? senha : usuario.senha,
        nome_loja: nome_loja? nome_loja : usuario.nome_loja
      })
      .where({ id: usuario.id });

    if (rowCount === 0) {
      res.status(200).json({ message: 'Usuário não foi atualizado.' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso.' });

  } catch ({ message }) {
    return res.status(400).json({ message })
  }

}

const listarUsuarios = async (req, res) => {

  try {
    const usuarios = await knex('usuarios').select('email');

    return res.status(200).json(usuarios);
  } catch ({ message }) {
    return res.status(400).json({ message })
  }
}

module.exports = {
  cadastroUsuario,
  atualizarUsuario,
  listarUsuarios
}