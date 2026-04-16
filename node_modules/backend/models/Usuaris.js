import mongoose from "mongoose";

const { Schema } = mongoose;

const UsuariSchema = new Schema({
  nom_complet: String,
  correu: { type: String, unique: true },
  contrasenya: String,
  data_creacio: { type: Date, default: Date.now },
  token: String,
  notificacions: Schema.Types.Mixed,
  historial_navegacio: Schema.Types.Mixed,

  ubicacioUsuari: {
    type: Schema.Types.ObjectId,
    ref: "UbicacioUsuari"
  },

  esdeveniment: {
    type: Schema.Types.ObjectId,
    ref: "Esdeveniment"
  }
});

export default mongoose.model("Usuari", UsuariSchema);