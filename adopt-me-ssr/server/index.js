import express from 'express';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync('dist/index.html').toString();
const parts = html.split('not rendered');

const app = express();

app.use('/dist', express.static('dist'));

app.use((req, res) => {
  const staticContent = {};

  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContent}>
      <App />
    </StaticRouter>
  );

  res.status(staticContent.statusCode || 200);
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Running on ${3000}`);
});
