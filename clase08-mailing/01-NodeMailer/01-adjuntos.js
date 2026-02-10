import nodemailder from "nodemailer"

const transporter = nodemailder.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com", 
            pass: "gtog kbkc udzs rges", 
        }
    }
)


export const enviar=()=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba de email simple c/adjuntos", 
            // text: "texto plano... ",
            html:`<h2>Prueba</h2>
            <br>
            <strong style="color:red;">Prueba negrita...</strong>

            `, 
            attachments: [
                {
                    path: "./images/diego10.jpg", 
                    filename: "diegote.jpg",
                }, 
                {
                    path: "./images/lio.jpg",
                    filename: "lio.jpg",
                }, 
                {
                    path: "./images/lio2.jpg",
                    filename: "lio2.jpg"
                },
            ]
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