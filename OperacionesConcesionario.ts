//@ts-ignore
import express, {Request, Response} from "npm:express@4.18.2"
import { concesionarioMode1Type } from "./concesionario.ts"
import mongoose from "npm:mongoose@7.6.3"
import { cocheMode1Type } from "./coche.ts"

export const addconcesionario = async(req:Request, res:Response) => {
    try
    {
    const {nombre, numcoches, ciudad, nombregerente} = req.body 

    if(!nombre || !numcoches || !ciudad || !nombregerente){
        res.status(500).send("Missing data")
        return
    }

    if(typeof nombre !== "string" || typeof numcoches !== "number" || typeof ciudad !== "string" || typeof nombregerente !== "string")
    {
        res.status(500).send("Invalid data type")
        return
    }

    const exists = await concesionarioMode1Type.findOne({nombre}).exec()
    if(exists){
        res.status(400).send("Este concesionario ya existe")
        return
    }

    if(numcoches > 10)
    {
        res.status(400).send("No se pueden tener mas coches en este concesionario")
        return
    }

    const char = await concesionarioMode1Type.create({
        nombre,
        numcoches,
        ciudad,
        nombregerente,
        
    })

    res.send({
        nombre,
        numcoches,
        ciudad,
        nombregerente,
        id: char.id,
    })
}
catch(e)
{
    res.status(500).send(e)
}
}

//Usar findById: https://mongoosejs.com/docs/api/model.html#Model.findById()
export const enviarcoches = async(req:Request, res:Response) => {
        try {
            const IDconcesionario = req.params.concesionarioId //String con el id del concesionario
            const IDcoche = req.params.cocheId

            const existsconcesionario = await concesionarioMode1Type.find(IDconcesionario).exec() 
            const existscoche = await cocheMode1Type.find({id:IDcoche}).exec() 

            if (!existsconcesionario || !existscoche) {
                return res.status(404).send("Concesionario o coche no encontrado")
            }
            
            const a = (await concesionarioMode1Type.find(IDconcesionario)).flatMap(elem=> elem.coches) //Guardas en a el array coches del concesionario cuyo ID sea IDconcesionario
            a.push(IDcoche)
            console.log(a)

            await concesionarioMode1Type.findOneAndUpdate({id:IDconcesionario},{
                coches: a
            })
    
            res.send("Coche asociado al concesionario correctamente")
        } catch (e) {
            res.status(500).send(e)
        }
}

//Funcion populate: https://mongoosejs.com/docs/populate.html
export const mostrarcoches = async(req:Request, res:Response) => {
    try{
        const ID = new mongoose.Types.ObjectId(req.params.ID) //ID del concesionario
        const resultado = await concesionarioMode1Type.find({id: ID}).exec()
        if (!resultado) 
        {
            return res.status(404).send("Concesionario no encontrado")
        }

        const carIDs = resultado.forEach((elem)=>elem.coches)//El array de los id de los coches asociados al id del concesionario que estamos buscando
        //carIDs tiene los id de los coches, pero no el resto de sus datos
        res.send(JSON.stringify(carIDs))
    } catch (e) {
        res.status(500).send(e)
    }
}