const router = require('express').Router();
var Filme = require('../app/models/filme');

async function getFilme(id) {
    const filme = await Filme.findOne({ _id: id });
    if (!filme) {
        res.status(422).json({ message: 'Filme não encontrado!' })
    }
    return filme;
}

router.post('/', async (req, res) => {
    const { nome } = req.body;
    const filme = { nome }

    try {
        const newFilme = await Filme.create(filme);
        res.status(201).json({ "filme": newFilme, message: "Filme cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).json({ "error": error });
    }
});
router.get('/', async (req, res) => {   
    try {
        const filmes = await Filme.find();
        res.status(200).json(filmes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao selecionar todos: " + error });
    }
});
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {nome, assistido} = req.body;
    const filme = {
        nome,
        assistido
    }

    try {
        const updatedFilme = await Filme.updateOne({_id: id}, filme);
        if (updatedFilme.matchedCount === 0) {
            res.status(422).json({ message: "O filme não foi encontrado!" });
            return;
        }
        res.status(200).json({message: "Atualizado com sucesso"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar dados: "+error })
    }
});
router.delete('/:id', async (req, res) => {
    
    try {
        const filme = await Filme.deleteOne({_id: req.params.id});

        if (filme.deletedCount === 0) {
            res.status(422).json({ error: 'Filme não encontrado!' });
            return;
        }
        
        res.status(200).json({ message: 'Filme removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: "Filme não encontrado: " + error });
    }     
});

module.exports = router;