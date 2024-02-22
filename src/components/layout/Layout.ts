import * as fs from 'fs';

const htmx = fs.readFileSync(
  './node_modules/htmx.org/dist/htmx.min.js',
  'utf8',
);
const picoCSS = fs.readFileSync(
  './node_modules/@picocss/pico/css/pico.indigo.min.css',
  'utf8',
);

const customCSS = fs.readFileSync('./src/static/custom.css', 'utf8');

export async function BaseHtml({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>${htmx}</script>
      <style>${picoCSS}</style>
      <style>${customCSS}</style>

      <title>${title}</title>
    </head>
    <body style="height: 100vh; display: flex;">
      ${children}
    </body>
  </html>
`;
}
// <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
// <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

export default BaseHtml;
