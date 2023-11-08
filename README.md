# Practica_4_Jose_Ignacio_Cano_Alonso
Este proyecto trata de crear una API con Express, Deno y MongoDB, la cual almacenará en una base de datos colecciones de coches, concesionarios y clientes.

El esquema de la colección coche tiene los siguientes parámetros:
marca: string -> marca del coche
tipo: TIPOS -> tipos de coche 
coste: number -> precio del coche

El esquema de la colección concesionario tiene los siguientes parámetros:
nombre: string -> nombre del concesionario
numcoches: number -> numero de coches que tiene el concesionario
ciudad: string -> ciudad en la que se encuentra el concesionario
nombregerente: string -> nombre del gerente del concesionario
coches: string[] -> los identificadores de todos los coches que se encuentran en el concesionario

El esquema de la colección cliente tiene los siguientes parámetros:
nombre: string -> nombre del cliente
genero: string -> genero del cliente
saldo: number -> saldo del cliente
DNI: string -> DNI del cliente
coches: string[] -> los identificadores de todos los coches que posee el cliente

Estas colecciones tendrán diversas operaciones, y cada una de ellas tendrá su propio endpoint:

Crear coches -> post("/crear/coches", addCoche)

Ver todos los coches -> get("/ver/coche/:ID", vercoches)

Crear concesionarios -> post("/crear/concesionarios", addconcesionario)

Crear cliente -> post("/crear/clientes", addcliente)

Ver un cliente segun su ID -> get("/ver/cliente/:ID", verclientes)

Enviar coches a un concesionario -> post("/enviar/coche/:IDcoche/aconcesionario/:IDconcesionario", enviarcoches)

Ver los coches de un concesionario -> get("/mostrar/coches/:ID", mostrarcoches)

Añadir dinero a un cliente para poder comprar un coche -> put("/aumentar/saldo/:ID/:saldo/", anadirdinero)
