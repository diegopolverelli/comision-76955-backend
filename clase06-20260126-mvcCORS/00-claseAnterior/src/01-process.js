import express from 'express';
import fs from "fs"
// console.log(`Hola...!!!`)

console.log("process id", process.pid)
console.log("uso de memoria", process.memoryUsage())
console.log("directorio actual", process.cwd())

console.log("variables de entorno:", process.env)
console.log("variable de entorno APPDATA:", process.env.APPDATA)
console.log("variable de entorno PRUEBA_SECRET:", process.env.PRUEBA_SECRET)

console.log("argumentos:", process.argv)

// let {nombre}=req.body

// let [rutaNode, rutaScript, ...argumentos]=process.argv  // ... son op REST
let [ , , ...argumentos]=process.argv  // ... son op REST
console.log(argumentos)
let indicePort
indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`El flag --port <PORT> es obligatorio...!!!`)
    process.exit()
}

const PORT=argumentos[indicePort + 1]

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

