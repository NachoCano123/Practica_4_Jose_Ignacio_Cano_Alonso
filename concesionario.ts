import mongoose from "npm:mongoose@7.6.3"
import { Concesionario } from "./TIPOS.ts"

const Schema = mongoose.Schema

const esquemaconcesionario = new Schema({
    nombre: {type: String, required: true},
    numcoches: {type: Number, required: true},
    ciudad: {type: String, required: true},
    nombregerente: {type: String, required: true},
    coches: {type:Array<String>, requitred:true}, //Este tiene que ser un array de string que contengan id de coches
}, {
    timestamps: true,
})

export type concesionarioMode1Type = mongoose.Document & Omit<Concesionario, "id">

export const concesionarioMode1Type = mongoose.model<concesionarioMode1Type>(
    "concesionarios",
    esquemaconcesionario
)