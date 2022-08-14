import mongoose from 'mongoose';
import latinize from "latinize";

const despesaSchema = new mongoose.Schema(
  {
    id: { type: String },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    data: { type: Date, default: Date.now },
    categoria: { type: mongoose.Types.ObjectId, ref: 'Categoria', default: '62f1404215e3c153c95efe9a' }
  },
  {
    versionKey: false,
    query: {
      byDescricao(descricao) {
        return this.where({ descricao: new RegExp(latinize(descricao), 'iu') })
      }
    }
  }
);

const Despesa = mongoose.model('Despesa', despesaSchema);

export default Despesa;