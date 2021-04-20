import express from 'express';
import fs from 'fs';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync('dist/index.html').toString();
const parts = html.split('not rendered');

const app = express();

app.use('/dist', express.static('dist'));

app.use((req, res) => {
  const staticContent = {};

  res.write(parts[0]);

  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContent}>
      <App />
    </StaticRouter>
  );
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.status(staticContent.statusCode || 200);
    res.write(parts[1]);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Running on ${3000}`);
});
