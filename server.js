#!/usr/bin/env node
/**
 * Minimal zero-dependency static file server for Quill PDF.
 *
 * A server is required because browsers refuse to start the pdf.js web worker
 * from a file:// URL. Run `npm start` and open the printed address.
 */
'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const ROOT = __dirname;

const argPort = (() => {
  const i = process.argv.indexOf('--port');
  return i !== -1 ? Number(process.argv[i + 1]) : NaN;
})();
const PORT = Number(process.env.PORT) || argPort || 5173;
const argHost = (() => {
  const i = process.argv.indexOf('--host');
  return i !== -1 ? process.argv[i + 1] : undefined;
})();
// 0.0.0.0 = reachable from other machines on the network; use --host 127.0.0.1 to keep it local.
const HOST = process.env.HOST || argHost || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }

  if (pathname === '/') pathname = '/index.html';

  // Resolve inside ROOT and reject anything that escapes it.
  const target = path.resolve(ROOT, '.' + pathname);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    const ext = path.extname(target).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    // The vendored libraries are ~2.7 MB and never change between visits, so
    // browsers may keep them for a week; everything is still revalidated by
    // ETag, so an updated file is picked up on the next load.
    const vendored = pathname.startsWith('/vendor/');
    const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const headers = {
      'Content-Type': type,
      'ETag': etag,
      'Last-Modified': stat.mtime.toUTCString(),
      'Cache-Control': vendored ? 'public, max-age=604800' : 'no-cache',
      'Vary': 'Accept-Encoding',
    };
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers).end();
      return;
    }
    const compressible = /^(text\/|application\/(json|javascript))/.test(type) && stat.size > 1024;
    const gzip = compressible && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (gzip) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      fs.createReadStream(target).pipe(zlib.createGzip({ level: 6 })).pipe(res);
    } else {
      headers['Content-Length'] = stat.size;
      res.writeHead(200, headers);
      fs.createReadStream(target).pipe(res);
    }
  });
});

server.listen(PORT, HOST, () => {
  const os = require('node:os');
  const lan = Object.values(os.networkInterfaces()).flat()
    .filter((a) => a && a.family === 'IPv4' && !a.internal).map((a) => a.address);
  console.log('');
  console.log('  Quill PDF   ->  http://localhost:' + PORT);
  if (HOST === '0.0.0.0' || HOST === '::') {
    lan.forEach((ip) => console.log('  Network     ->  http://' + ip + ':' + PORT));
  }
  console.log('  Serving     ->  ' + ROOT);
  console.log('  Everything runs in your browser. No file ever leaves this machine.');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: npm start -- --port 5174`);
    process.exit(1);
  }
  throw err;
});
