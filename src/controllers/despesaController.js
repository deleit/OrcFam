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
}

export default DespesaController;