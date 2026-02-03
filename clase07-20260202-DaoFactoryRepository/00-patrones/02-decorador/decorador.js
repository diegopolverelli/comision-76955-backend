
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    // console.log("la funcion...")
    return a+b
}

console.log(suma(4,5))

const decoradorLog=(fn)=>{
    return (...argumentos)=>{   // los ... son aqui el operador REST 

        console.log(`La funcion ${fn.name} se ejecuto el ${new Date().toUTCString()}`)

        return fn(...argumentos)  // los ... son el op. SPREAD
    }
}

let sumaConLog=decoradorLog(suma)

console.log(sumaConLog(10, 4))
console.log(suma(4,5))

const saludar=(nombre)=>{
    return `Hola don ${nombre}`
}

console.log(saludar(`José`))
let saludaConLog=decoradorLog(saludar)
console.log(saludaConLog(`Carlitos`))




// import { Controller, Get } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {

//   @Get()
//   findAll() {
//     return 'This action returns all cats';
//   }
// }
