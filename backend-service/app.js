const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/message') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Hello from Backend API v2🚀" }));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

