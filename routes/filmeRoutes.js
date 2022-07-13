const router = require('express').Router();
const Filme = require('../app/models/filme');

router.post('/', async (req, res) => {
    const { nome } = req.body;
    const filme = { nome };

    if (nome === '') {
        res.status(400).json({ error: 'Informe o nome do filme.' });
        return;
    }

    try {
        const newFilme = await Filme.create(filme);
        res.status(201).json({
            filme: newFilme,
            message: 'Filme cadastrado com sucesso!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar filme.' });
    }
});
router.get('/', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.status(200).json(filmes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao selecionar todos.' });
    }
});
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, assistido } = req.body;
    const filme = {
        nome,
        assistido,
    };

    if (!id) {
        res.status(500).json({ error: 'É necessário enviar id.' });
        return;
    }

    if (nome === '') {
        res.status(400).json({ message: 'Informe o nome do filme.' });
        return;
    }

    try {
        let updatedFilme;
        if (assistido === undefined && !nome) {
            res.status(500).json({
                error: 'É necessário enviar ao menos um parametro.',
            });
            return;
        }

        if (assistido === undefined && nome) {
            updatedFilme = await Filme.updateOne(
                { _id: id },
                { $set: { nome } },
            );
        }

        if (!nome) {
            updatedFilme = await Filme.updateOne(
                { _id: id },
                { $set: { assistido } },
            );
        }
        if (assistido !== undefined) {
            updatedFilme = await Filme.updateOne({ _id: id }, filme);
        }

        if (updatedFilme.matchedCount === 0) {
            res.status(422).json({ error: 'O filme não foi encontrado!' });
            return;
        }

        res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar dados' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const filme = await Filme.deleteOne({ _id: req.params.id });

        if (filme.deletedCount === 0) {
            res.status(422).json({ error: 'Filme não encontrado!' });
            return;
        }
        res.status(200).json({ message: 'Filme removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Filme não encontrado' });
    }
});

module.exports = router;
