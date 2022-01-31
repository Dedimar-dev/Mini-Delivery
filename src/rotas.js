const express = require('express');
const produtos = require('./controladores/produtos');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaToken = require('./filtros/verificaToken')

const rotas = express();

rotas.post('/usuarios', usuarios.cadastroUsuario);
rotas.post('/login', login.login);

rotas.use(verificaToken);

rotas.put('/usuarios', usuarios.atualizarUsuario);
rotas.post('/produtos', produtos.cadastroProduto);
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:nome', produtos.pesquisarProdutos);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);

module.exports = rotas;