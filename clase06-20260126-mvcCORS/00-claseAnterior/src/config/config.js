import dotenv from "dotenv"
import {Command, Option} from "commander"

const program=new Command()

program.option("-d, --debug", "Activa modo debug", )
program.addOption(new Option("-m, --mode <MODE>", "Entorno de ejecución del server").choices(["production", "development"]).default("production"))

program.parse()
const opts=program.opts()
console.log(opts)

let MODE=opts.mode

dotenv.config({
    path: MODE=="production"?"./.env.prod":"./.env.dev", 
    override: true, 
    quiet: true
})

export const config={
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME
}