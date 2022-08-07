import Receita from "../models/Receita.js";

class ReceitaController {
  static listaReceitas = (req, res) => {
    Receita.find((err, receitas) => {
      if (err)
        res.status(500).send({ erro: `Falha ao listar receitas: ${err.message}` });
      else
        res.status(200).json(receitas)
    })
  }

  static listaReceitaPorId = (req, res) => {
    let id = req.params.id;

    Receita.findById(id, (err, receita) => {
      if (err)
        res.status(400).send({ error: `ID de receita não localizada: ${err.message}` })
      else
        res.status(200).json(receita);
    });
  }

  static cadastraReceita = (req, res) => {
    let data = new Date(req.body.data);
    let primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1);
    let ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    Receita.find({
      descricao: req.body.descricao,
      data: {
        $gte: new Date(primeiroDiaDoMes),
        $lt: new Date(ultimoDiaDoMes)
      }
    }, {}, (error, data) => {
      if (error) {
        res.status(500).send({ error: `Falha ao cadastrar receita: ${error.message}` });
      } else if (data.length === 0) {
        let receita = new Receita(req.body);
        receita.save((err) => {
          if (err) {
            res.status(500).send({ error: `Falha ao cadastrar receita: ${err.message}` });
          }
          else {
            res.status(201).send(receita.toJSON());
          }
        })
      } else {
        res.status(500).send({ error: 'Falha ao cadastrar receita: duplicada' })
      }
    })
  }
}

export default ReceitaController;