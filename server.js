//Chamadas dos pacotes:
var express = require('express');
var app = express();

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

var mongoose = require('mongoose');
var Filme = require('./app/models/filme');
mongoose.Promise = global.Promise;

//uri de acesso ao mongodb
const uri = "mongodb://root:root@cluster0-shard-00-00.kl6ju.mongodb.net:27017,cluster0-shard-00-01.kl6ju.mongodb.net:27017,cluster0-shard-00-02.kl6ju.mongodb.net:27017/?ssl=true&replicaSet=atlas-aqkl9c-shard-0&authSource=admin&retryWrites=true&w=majority";

//Conexão mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Conectado ao mongo');
}).catch((e) => {
    console.log('Erro ao conectar: ' +e);
});


//Maneira Local: MongoDb:
/*mongoose.connect('mongodb://localhost:27017/node-crud-api', {
    useMongoClient: true
});*/

//Configuração da variável app para usar o 'bodyParser()':
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());



//Rotas da nossa API:
//=============================================================================

//Criando uma instância das Rotas via Express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão:
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui...');
    next();
});

//Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api): 
router.get('/', function(req, res) {
    res.json({ message: 'Olá! Bem vindo(a) ao nosso App' })
});

//rotas
router.route('/filmes')
    .post(function (req, res) {
        var filme = new Filme();
        filme.nome = req.body.nome;
        filme.assistido = false;
        filme.save(function (error) {
            if (error)
                res.send('Erro ao tentar salvar o Filme...: ' + error)
            res.json({ message: "Filme cadastrado com sucesso!"})
        });
    })
    .get(function (req, res) {
        Filme.find(function (error, filmes) {
            if (error)
                res.send('Erro ao selecionar todos: ' + error);

            res.json(filmes)
        })
    })
    .delete(function (req, res) {
        Filme.remove({
            _id: req.params.filme_id
        }, function (error) {
            if (error) {
                res.send("ID do Filme não encontrada: " + error);
            }
            res.send({ message: 'Filme removido com sucesso' })
        })        
    });  

//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port, () => {
    console.log("Iniciando a app na porta " + port);
});