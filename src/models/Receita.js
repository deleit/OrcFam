import mongoose from 'mongoose';

const receitaSchema = new mongoose.Schema({
  id: { type: String },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true }
}, { versionKey: false });

const Receita = mongoose.model('Receita', receitaSchema);

export default Receita;