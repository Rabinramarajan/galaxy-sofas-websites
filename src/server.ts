import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';

const app = express();
const angularAppEngine = new AngularNodeAppEngine();

app.use((req, res, next) => {
  const response = angularAppEngine.handle(req);
  if (response) {
    response.then((rendered) => {
      if (rendered) {
        writeResponseToNodeResponse(rendered, res);
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Galaxy Sofas SSR server running on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
