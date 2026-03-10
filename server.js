const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Define la ruta del archivo
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Evita directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    // Lee el archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - Página no encontrada');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error del servidor');
            }
            return;
        }

        // Determina el tipo de contenido
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) contentType = 'text/css';
        if (filePath.endsWith('.js')) contentType = 'application/javascript';
        if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
        if (filePath.endsWith('.png')) contentType = 'image/png';
        if (filePath.endsWith('.gif')) contentType = 'image/gif';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, 'localhost', () => {
    console.log(`\n✅ Andy's Bakery Website está corriendo en: http://localhost:${PORT}\n`);
    console.log('Presiona CTRL+C para detener el servidor\n');
});
