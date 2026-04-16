import mongoose from "mongoose";

const { Schema } = mongoose;

const UsuariSchema = new Schema({
  nom_complet: { type: String, required: true },
  correu: { type: String, unique: true, required: true },
  contrasenya: { type: String, required: true },

  data_creacio: { type: Date, default: Date.now },

  token: String,
  notificacions: Schema.Types.Mixed,
  historial_navegacio: Schema.Types.Mixed,

  ubicacioUsuari: {
    type: Schema.Types.ObjectId,
    ref: "UbicacioUsuari",
  },

  esdeveniment: {
    type: Schema.Types.ObjectId,
    ref: "Esdeveniment",
  },
});

export default mongoose.model("usuaris", UsuariSchema);