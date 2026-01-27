import express from 'express';
import cors from "cors"
import { router as productsRouter } from './routes/products.routes.js';
import { router as customersRouter } from './routes/customers.routes.js';
const PORT=3000;

const app=express();

app.use(cors())
// app.use(cors({origin:["www.miempresa1.com","www.miempresa2.com",]}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/customers", customersRouter)
// app.use("/api/customers", cors(), customersRouter)
app.use("/api/products", productsRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
