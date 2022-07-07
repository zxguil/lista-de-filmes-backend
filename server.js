//Chamadas dos pacotes:
require('dotenv').config();  
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const cors = require('cors');

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;


//Configurando variáveis para acesso ao mongodb
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const uri = `mongodb+srv://${username}:${password}@clusterfilmes.kl6ju.mongodb.net/?retryWrites=true&w=majority`;

//Conexão mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Conectado ao mongo');
    //Iniciando a API junto a conexão com o mongo
    app.listen(port, () => {
        console.log("Iniciando a app na porta " + port);
    });
}).catch((e) => {
    console.log('Erro ao conectar: ' +e);
});

//Configurando o express para ler JSON
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());

//Rotas da nossa API:
//=============================================================================
var router = express.Router();
const filmeRoutes = require('./routes/personRoutes');

//Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão:
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui...');
    next();
});

//Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api): 
router.get('/', function(req, res) {
    res.json({ message: 'Olá! Bem vindo(a) ao nosso App' });
});

//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Definindo a rota de filmes: '/api/filmes'
router.use('/filmes', filmeRoutes);  