const express = require('express');
const bodyParser = require('body-parser');
const { _getGoogleSheetClient, _readGoogleSheet, sheetUtils } = require('./utils') ;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// GET all movies
app.get('/movies', async(req, res) => {
    const googleSheetClient = await _getGoogleSheetClient();
    const data = await _readGoogleSheet(googleSheetClient, sheetUtils.sheetId, sheetUtils.tabName, sheetUtils.range);
    res.json(data)
});

// GET a single movie by ID
app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// POST a new movie
app.post('/movies', (req, res) => {
    const movie = req.body;
    movies.push(movie);
    res.status(201).json(movie);
});

// PUT update a movie by ID
app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies[index] = req.body;
        res.json(movies[index]);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// DELETE a movie by ID
app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
