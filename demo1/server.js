const fs = require('fs');
const url = require('url');
const http = require('http');

http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;
    let query = url.parse(request.url).query;
    query = JSON.parse(decodeURIComponent(query));
    let firstDir = pathname && pathname.split('/')[1];
    let ContentType = null;

    if (firstDir && firstDir === 'static') {
        if (pathname.indexOf('.html')) {
            ContentType = { 'Content-Type': 'text/html' }
        } else if (pathname.indexOf('.css')) {
            ContentType = { 'Content-Type': 'text/css' };
        }
        
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, { 'Content-Type': 'text/html' });
            }
            else {
                response.writeHead(200, ContentType);
                response.write(data.toString());
            }
            response.end();
        });
        
    } else if (firstDir =='cgi'){
        ContentType = { 'Content-Type': 'application/json' }
        response.writeHead(200, ContentType);
        response.write(JSON.stringify({
            result: 'ok',
            query: query
        }));
        response.end();
    }

}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');