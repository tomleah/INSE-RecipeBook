const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use('/', express.static('static'));

app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server running on PORT: ${PORT}`);
});
