const divMensaje=document.getElementById("mensaje")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnSubmit.addEventListener("click", async(e)=>{

    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value

    if(!email || !password){
        divMensaje.textContent=`Complete los datos`
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return
    }

    const response=await fetch("/login", {
        method: "post", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensaje.textContent=error
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);      
        return   
    }

    let {usuarioLogueado, token}=await response.json()
    divMensaje.textContent=`Login exitoso para ${usuarioLogueado.nombre}`
    localStorage.setItem("coderToken", token)
})


btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    const response=await fetch("/usuario",{
        headers:{
            "Authorization":`BEARER ${localStorage.getItem("coderToken")}`
        }
    })

    if(response.status>=400){
        let {error, detalle}=await response.json()
        divDatos.textContent=`Error al recuperar datos: ${error} | ${detalle}`
        return
    }

    let {mensaje}=await response.json()
    divDatos.textContent=mensaje

    // para el LOGOUT, boton que haga: localStorage.removeItem("coderToken")

})