// import { MemoryHeroesDAO as DAO } from "../dao/memoryHeroesDAO.js"

import { heroesService } from "../service/index.js"

// let heroesService=new DAO()


async function getHeroes(req,res){

    // let heroes=await heroesService.get()
    let heroes=await heroesService.getHeroes()

    res.status(200).json({heroes})
}

async function getInforme(req, res){
    try {
        let informe=await heroesService.informe()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({informe});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error...`})
    }
}

export default {getHeroes, getInforme}