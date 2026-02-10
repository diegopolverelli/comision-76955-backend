// gtog kbkc udzs rges
import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        // host: "mail.miempresa.com",
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com",
            pass: "gtog kbkc udzs rges",
        }
    }
)

export function enviar(){
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba de email simple", 
            // text: "texto plano... ",
            html:`<h2>Prueba</h2>
            <br>
            <strong style="color:red;">Prueba negrita...</strong>

            `
        }
    )
}

enviar()
    .then(resultado=>{
        // console.log(resultado)
        if(resultado.rejected.length>0){
            console.log(`Algún destinatario tenía problemas`)
        }else{
            console.log(`Mensaje enviado...!!!`)
        }
    })
    .catch(e=>{
        console.log(e.message)
    })