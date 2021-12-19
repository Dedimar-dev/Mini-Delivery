const knex = require('../bancodedados/conexao');
const {
  cadastroProdutoSchema,
  atualizacaoProdutoSchema
} = require('../validacoes/produtoSchema');

const cadastroProduto = async (req, res) => {
  const {
    nome,
    descricao,
    preco,
    quantidade
  } = req.body

  try {
    await cadastroProdutoSchema.validate(req.body);

    const { rowCount } = await knex('produtos')
      .insert({
        nome,
        descricao,
        preco,
        quantidade
      });

    if (rowCount === 0) {
      return res.status(200).json({ message: 'Produto não cadastrado.' });
    }

    return res.status(200).json({ message: 'Produto cadastrado com sucesso.' });

  } catch ({ message }) {
    return res.status(400).json({ message })
  }

}

const listarProdutos = async (req, res) => {

  try {

    const produtos = await knex('produtos');

    return res.status(200).json(produtos);

  } catch ({ message }) {
    return res.status(400).json({ message })
  }
}

const listarProduto = async (req, res) => {
  const { id } = req.params;

  try {

    const produto = await knex('produtos')
      .where({ id })
      .first();

    if (!produto) {
      return res.status(400).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json(produto);

  } catch ({ message }) {
    return res.status(400).json({ message })
  }
}

const atualizarProduto = async (req, res) => {
  const {
    nome,
    descricao,
    preco,
    quantidade
  } = req.body

  const { id } = req.params;

  try {
    await atualizacaoProdutoSchema.validate(req.body);

    const produto = await knex('produtos')
      .where({ id })
      .first();

    if (!produto) {
      return res.status(400).json({ message: 'Produto não encontrado.' });
    }

    const produtoAtualizado = await knex('produtos')
      .update({
        nome,
        descricao,
        preco,
        quantidade
      })
      .where({ id });

    if (produtoAtualizado === 0) {
      return res.status(200).json({ message: 'Produto não atualizado.' });
    }

    return res.status(200).json({ message: 'Produto atualizado com sucesso.' });

  } catch ({ message }) {
    return res.status(400).json({ message })
  }

}

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {

    const produto = await knex('produtos')
      .where({ id })
      .first();

    if (!produto) {
      return res.status(400).json({ message: 'Produto não encontrado.' });
    }

    const produtoDeletado = await knex('produtos')
      .del()
      .where({ id });

    if (produtoDeletado === 0) {
      return res.status(400).json({ message: 'Produto não deletado.' });
    }

    return res.status(200).json({ message: 'Produto deletado com sucesso.' });

  } catch ({ message }) {
    return res.status(400).json({ message })
  }
}


module.exports = {
  cadastroProduto,
  atualizarProduto,
  listarProdutos,
  listarProduto,
  deletarProduto 
}