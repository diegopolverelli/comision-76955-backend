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


const enviar=()=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba de email simple c/ adjuntos incrustados", 
            // text: "texto plano... ",
            html:`<h2>Prueba</h2>
            <br>
            <strong style="color:red;">Prueba negrita...</strong>
            <img src="cid:adjunto01" width="300">
            <div>
            <p>
                Imagen Lio
                <img src="cid:adjunto02" width="300">
            </p>
            </div>
            <img src="cid:adjunto03" width="300">
            `, 
            attachments: [
                {
                    path: "./images/diego10.jpg", 
                    filename: "diegote.jpg",
                    cid: "adjunto01",
                }, 
                {
                    path: "./images/lio.jpg",
                    filename: "lio.jpg",
                    cid: "adjunto02",
                }, 
                {
                    path: "./images/lio2.jpg",
                    filename: "lio2.jpg",
                    cid: "adjunto03",
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