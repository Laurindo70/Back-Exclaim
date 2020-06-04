const connection = require("../database/connection");


module.exports = {
    async create (req, res){
        try {
            const { preco, data, cpf,  placa } = req.body;
                const dono_id = await connection("Proprietario")
                    .where("cpf", cpf)
                    .select("id")
                    .first();

                const id_veiculo = await connection("Veiculos")
                    .where({
                    placa: placa,
                    id_dono: dono_id.id,
                })
                    .select("id") 
                    .first();
                const veiculo_id = id_veiculo.id;

            if(!dono_id){
                 return res.status(400).send({ Message: "cliente não cadastrado" });
            }
            
            if(veiculo_id){
                await connection("Revisao").insert({
                    preco,
                    data,
                    veiculo_id,
                });

                console.log(dono_id, veiculo_id);

                return res.status(200).send({ Message: "Revisao Marcada" });
            } else {
                return res.status(400).send({ Message: "Revisao não marcada" });
            }


        } catch (error) {
            console.log(error);

                return res.status(400).send({ Message: "Algo está errado, tente novamente" });
        }
    },  

    async index(req, res){
        const revisoes = await connection.select('Revisao.id','preco', 'data', 'nome_carro', 'nome', 'placa').
        from("Revisao").leftJoin("Veiculos", 'Revisao.veiculo_id', 'Veiculos.id')
        .leftJoin("Proprietario", "Veiculos.id_dono", "Proprietario.id")
        /*select cliente.*, pedido.* from cliente left join pedido on id_cliente=cliente_id_cliente;*/     
        
        res.json( revisoes);
    }
};
