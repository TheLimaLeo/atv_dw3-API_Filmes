const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let filmes = [
    { id: 1, titulo: 'Vingadores: Ultimato', ano: 2019, genero: 'Ação/Aventura' },
    { id: 2, titulo: 'Os Incríveis', ano: 2004, genero: 'Animação/Aventura' },
    { id: 3, titulo: 'X-Men: O Confronto Final', ano: 2006, genero: 'Ação/Ficção Científica' },
    { id: 4, titulo: 'A Hora do Rush', ano: 1998, genero: 'Ação/Comédia' }
];

app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API de Filmes!');
});

app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

app.get('/api/filmes/:id', (req, res) => {
    const filmeId = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === filmeId);

    if (filme) {
        res.json(filme);
    } else {
        res.status(404).send('Filme não encontrado.');
    }
});

app.post('/api/filmes', (req, res) => {
    const novoFilme = {
        id: filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1,
        titulo: req.body.titulo,
        ano: req.body.ano,
        genero: req.body.genero
    };
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

app.put('/api/filmes/:id', (req, res) => {
    const filmeId = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === filmeId);

    if (filme) {
        filme.titulo = req.body.titulo || filme.titulo;
        filme.ano = req.body.ano || filme.ano;
        filme.genero = req.body.genero || filme.genero;
        res.json(filme);
    } else {
        res.status(404).send('Filme não encontrado.');
    }
});

app.delete('/api/filmes/:id', (req, res) => {
    const filmeId = parseInt(req.params.id);
    const initialLength = filmes.length;
    filmes = filmes.filter(f => f.id !== filmeId);

    if (filmes.length < initialLength) {
        res.status(204).send(); 
    } else {
        res.status(404).send('Filme não encontrado.');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor de Filmes rodando em http://localhost:${PORT}`);
});