const express = require('express');
const cors = require('cors');

const feed = require('./controllers/feed');
const { PORT } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/images', feed);

const port = PORT || 4040;
app.listen(port, () => console.log(`listen on port ${port}`));
