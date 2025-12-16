import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(cookieParser("secret123"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/setcookies',(req,res)=>{

    let datos={
        fontSize: 18, 
        theme: "dark"
    }

    res.cookie("cookie01", datos, {})
    res.cookie("cookie02vto", datos, {maxAge: 10000})
    res.cookie("cookie03vto", datos, {expires: new Date(2025, 11, 18)})
    res.cookie("cookie04vtoSigned", datos, {expires: new Date(2025, 11, 18), signed: true})
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Cookies seteadas`});
})

app.get("/getcookies", (req, res)=>{

    let cookiesRecibidas=req.cookies
    let signedCookiesRecibidas=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookiesRecibidas, 
        signedCookiesRecibidas
    }});
})

app.get("/delcookies", (req, res)=>{

    let cookies=Object.keys(req.cookies)
    cookies.forEach(c=>res.clearCookie(c))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(c=>res.clearCookie(c))
    

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies eliminadas...!!!"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
