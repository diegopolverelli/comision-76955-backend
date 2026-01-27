const divDatos=document.getElementById("datos")
const btnVentas=document.getElementById("btnVentas")

btnVentas.addEventListener("click", async(e)=>{
    e.preventDefault()

    try {
        const response=await fetch("http://localhost:3000/api/customers/ventas")
        if(response.status>=400){
            divDatos.textContent="Error..."
            return 
        }
        let datos=JSON.stringify(await response.json())
        divDatos.textContent=datos
    } catch (error) {
        divDatos.textContent=`Error: ${error.message}`
        return 
    }
})