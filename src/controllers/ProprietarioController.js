const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async create(req, res){
        try {
           const {nome, cpf, email, numero, sexo, idade} = req.body;
           
           const id = crypto.randomBytes(4).toString('HEX');

           const Proprietario = await connection("Proprietario")
                .where('cpf', cpf)
                .select('nome')
                .first();

            if(!Proprietario){
                await connection("Proprietario").insert({
                    id, 
                    nome,  
                    email, 
                    numero,
                    sexo,
                    idade,
                    cpf,
                });

                console.log(nome, cpf);
                return res.status(200).send({ message:"Cliente Cadastrado", id });                
            } else {
                console.log('Cliente ja cadastrado');
                return res.status(200).send({ message: "Cliente ja cadastrado"});    
            }
           
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: "Algo errado" });
        }
    },

    async index(req, res){
        const clientes = await connection("Proprietario")
            .select('*');
        return res.json(clientes);
    },

    async indexcarros(req, res){
        const clientes = await connection.select('*').from 
            ("Proprietario").rightJoin("Veiculos", "Proprietario.id", "Veiculos.id_dono").orderBy('nome');
        
        return res.json(clientes);
    },

    async indexSexo(req, res){
         const clientes = await connection.select('sexo').count('id_dono', 'sexo')
                .from("Proprietario").rightJoin("Veiculos", "Proprietario.id", "Veiculos.id_dono").groupBy('sexo');

        if(clientes[0].count < clientes[1].count){
            return res.json(clientes[1])
        }

        return res.json(clientes[0]);
    }
}