const nodemail = require("../nodemail/nodemail");

const postNodemail = async (req, res) => {
    console.log("recuperar:", req.body)
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    nodemail(email, nome, mensagem)
    .then(response => {console.log("recuperar:", response); res.json(response)})
    .catch(error => {console.log("recuperar:", error);res.json(error)});
}

module.exports = {
    postNodemail
}