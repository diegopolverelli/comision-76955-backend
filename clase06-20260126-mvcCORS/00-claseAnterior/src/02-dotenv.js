// process.loadEnvFile("./.env")
import dotenv from "dotenv"

dotenv.config({
    path: "./.env", 
    override: true, 
    quiet: true
})

const PORT=process.env.PORT

console.log(`Server on line in port ${PORT}`)
console.log(process.env.SECRET)
console.log(process.env.DB_NAME)
console.log("PRUEBA_SECRET:", process.env.PRUEBA_SECRET)
console.log("PRUEBA_PORT:", process.env.PRUEBA_PORT)

