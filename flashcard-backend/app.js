const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const flashcardsRouter = require('./routes/flashcards');

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/flashcards', flashcardsRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});