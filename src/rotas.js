const express = require('express');
const produtos = require('./controladores/produtos');

const rotas = express();

rotas.post('/produtos', produtos.cadastroProduto);
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.listarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);

module.exports = rotas;