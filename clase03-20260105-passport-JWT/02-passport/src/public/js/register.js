let divMensaje=document.getElementById("mensaje")
let inputNombre=document.getElementById("nombre")
let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")
let btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let nombre=inputNombre.value 
    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!nombre || !email || !password){
        divMensaje.textContent=`Complete los datos`
        return 
    }

    let body={
        nombre, 
        email, 
        password
    }

    let response=await fetch("/api/sessions/register", {
        method: "post", 
        headers:{
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify(body)
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensaje.textContent=error
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    window.location.href="/login?mensaje=Registro exitoso para "+nombre
})