const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../validacoes/loginSchema');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await loginSchema.validate(req.body);

    const usuario = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não foi encontrado' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ message: 'Email e senha não conferem' })
    }

    const senhaHash = process.env.SENHA_HASH

    const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

    return res.status(200).json({
      token
    });
    
  } catch ({ message }) {
    return res.status(400).json({ message })
  }

}

module.exports = {
  login
}