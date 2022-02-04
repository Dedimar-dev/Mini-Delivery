const knex = require('../bancodedados/conexao');
const jwt = require('jsonwebtoken');

const verificaToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  try {

    const token = authorization.replace('Bearer', '').trim();

    const senhaHash = process.env.SENHA_HASH;
    const { id } = jwt.verify(token, senhaHash);

    const usuarioExistente = await knex('usuarios').where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }

    const { senha, ...usuario } = usuarioExistente;

    req.usuario = usuario;

    next();
  } catch ({ message }) {
    return res.status(400).json({ message })
  }
}

module.exports = verificaToken;
