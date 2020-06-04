const connection = require('../database/connection');


module.exports = {
    async create(req, res){
        try {
            const { nome_carro, marca, ano_fabricacao, placa, cpf } = req.body;

            const dono = await connection("Proprietario")
                .where('cpf', cpf)
                .select('id')
                .first();
                
            if(!dono){
                return res.status(400).send({ Message:"Cliente não cadastrado, efetue o cadatro de seu cpf." });
            }

            const id_dono = dono.id;
            const carros = await connection("Veiculos")
                .where('placa', placa)
                .select('marca')
                .first();
        
            if(!carros){
                await connection("Veiculos").insert({
                    nome_carro,
                    marca, 
                    ano_fabricacao,
                    placa,
                    id_dono,
                }); 
                console.log(nome_carro, marca);
                return res.status(200).send({ Message:"Carro cadastrado" });

            } else {
                return res.status(400).send({ Message: "Carro ja cadastrado" });
            }

            } catch (error) {
                console.log(error);

                return res.status(400).send({ Message: "Algo está errado, tente novamente" });
            }
    }, 

    async index(req, res){
        const carros =  await connection.select('Veiculos.id', 'nome_carro', 'marca', 'ano_fabricacao', 'placa', 'nome')
            .from("Proprietario").rightJoin("Veiculos", "Proprietario.id", "Veiculos.id_dono").orderBy('nome');
        
        res.json(carros);
    },

    async indexMarcas(req, res){
        const carros = await connection("Veiculos").select('marca').count('id', 'marca').groupBy('marca').orderBy('count', 'desc');
        

        res.json(carros);
    },

    async indexMarcarSexo(req, res){
        const carros = await connection.select('sexo', 'marca').count('id_dono', 'sexo')
        .from("Proprietario").rightJoin("Veiculos", "Proprietario.id", "Veiculos.id_dono").groupBy('sexo', 'marca').orderBy('count', 'desc');
 
        
        res.json(carros);
    }

}