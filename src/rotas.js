const express = require('express');
const usuarios = require('./controladores/usuarios');

const rotas = express()

rotas.post('/usuarios', usuarios.cadastroUsuario);

module.exports = rotas;