
const cadastroUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha,
  } = req.body
  
  try {
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error.message)
  }
 
}

module.exports = {
  cadastroUsuario
}