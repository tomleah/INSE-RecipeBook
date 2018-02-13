const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./database/database-model-sql');

app.use('/', express.static('static'));

app.get('/data/recipes', async (req, res) => {
  res.send(await db.getRecipes());
});

app.listen(PORT, async (err) => {
  if (err) console.error(err);
  else console.log(`Server running on PORT: ${PORT}`);
});
