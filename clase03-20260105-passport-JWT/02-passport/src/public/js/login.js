let divMensaje=document.getElementById("mensaje")
let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")
let btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!email || !password){
        divMensaje.textContent=`Complete los datos`
        return 
    }

    let body={
        email, 
        password
    }

    let response=await fetch("/api/sessions/login", {
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

    window.location.href="/datos"
})