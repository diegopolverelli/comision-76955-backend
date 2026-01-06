import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home')
})

router.get('/datos', auth, (req,res)=>{
    let {nombre, email}=req.user
    res.status(200).render('datos', {nombre, email})
})

router.get('/register',(req,res)=>{

    res.status(200).render('register')
})

router.get('/login',(req,res)=>{

    res.status(200).render('login')
})

