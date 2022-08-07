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
}

export default DespesaController;