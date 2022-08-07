import Despesa from "../models/Despesa.js";

class DespesaController {
  static listaDespesas = (req, res) => {
    Despesa.find((err, despesas) => {
      if (err)
        res.status(500).send({ error: `Falha ao listar despesas: ${err.message}` });
      else
        res.status(200).json(despesas)
    })
  }

  static listaDespesaPorId = (req, res) => {
    let id = req.params.id;

    Despesa.findById(id, (err, despesa) => {
      if (err)
        res.status(400).send({ error: `ID de despesa não localizada: ${err.message}` });
      else
        res.status(200).json(despesa);
    });
  }

  static cadastraDespesa = (req, res) => {
    let data = new Date(req.body.data);
    let primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1);
    let ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    Despesa.find({
      descricao: req.body.descricao,
      data: {
        $gte: new Date(primeiroDiaDoMes),
        $lt: new Date(ultimoDiaDoMes)
      }
    }, {}, (error, despesas) => {
      if (error) {
        res.status(500).send({ error: `Falha ao cadastrar: ${error.message}` });
      } else if (despesas.length === 0) {
        let despesa = new Despesa(req.body);
        despesa.save((err) => {
          if (err) {
            res.status(500).send({ error: `Falha ao cadastrar despesa: ${err.message}` });
          } else {
            res.status(201).send(despesa.toJSON());
          }
        });
      } else {
        res.status(500).send({ error: 'Falha ao cadastrar despesa: duplicada' });
      }
    });
  }
}

export default DespesaController;