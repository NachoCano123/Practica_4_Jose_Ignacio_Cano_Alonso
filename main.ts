import mongoose from "npm:mongoose@7.6.3"
import express, {Request, Response} from "npm:express@4.18.2" 
import { addCoche, vercoches } from "./OperacionesCoches.ts"
import { addconcesionario, enviarcoches, mostrarcoches } from "./OperacionesConcesionario.ts"
import { addcliente, anadirdinero, verclientes } from "./OperacionesCliente.ts"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"

const env = await load()

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL") //Si no esta en el archivo, miro si esta en las variables de entorno (esto || lo otro)
const PORT = env.PORT || Deno.env.get("PORT") || 3100

if(!MONGO_URL){
  console.error("necesitas definir mongo_url env")
}

try //Para ver si se conecta a la base de datos
{
  await mongoose.connect(MONGO_URL)
  console.info("Mongo connected")

  const app = express() //Creo el servidor
  app.use(express.json()) 

  //crear coche
  app.post("/crear/coches", addCoche)

  //Ver coches
  app.get("/ver/coche/:ID", vercoches)

  //crear concesionario
  app.post("/crear/concesionarios", addconcesionario)
  
  //Enviar coches al concesionario
  app.post("/enviar/coche/:IDcoche/aconcesionario/:IDconcesionario", enviarcoches)

  //Mostrar coches del concesionario
  app.get("/mostrar/coches/:ID", mostrarcoches)

  //crear cliente
  app.post("/crear/clientes", addcliente)

  //ver cliente
  app.get("/ver/cliente/:ID", verclientes)

  //actualizar saldo
  app.put("/aumentar/saldo/:ID/:saldo/", anadirdinero)

  app.listen(
    PORT, 
    () => console.info(`Te estoy escuchando en el puerto ${PORT}`),
    )
} catch (e)
{
    console.error(e)
}
