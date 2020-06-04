const express = require("express");
const rotas =  express.Router();

const ProprietarioController = require('./controllers/ProprietarioController');
const VeiculosController = require('./controllers/VeiculosController');
const RevisaoController = require('./controllers/RevisaoController');

rotas.post("/cadatro_cliente", ProprietarioController.create);
rotas.get("/clientes", ProprietarioController.index);
rotas.get("/clientes-carros", ProprietarioController.indexcarros);
rotas.get("/clientes-sexo", ProprietarioController.indexSexo);

rotas.post("/cadastro-carros", VeiculosController.create);
rotas.get("/carros", VeiculosController.index);
rotas.get("/carros-marca", VeiculosController.indexMarcas);
rotas.get("/carros-marca-sexo", VeiculosController.indexMarcarSexo);

rotas.post("/cadastro_revisao", RevisaoController.create);
rotas.get("/revisoes", RevisaoController.index);



module.exports = rotas;