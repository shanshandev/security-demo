const fs = require('fs');
const url = require('url');
const http = require('http');

function parseCookie(request) {
    let cookieObj = {};
    let cookie = request.headers.cookie;
    cookie && cookie.split(';').forEach(item => {
        let pats = item.split('=');
        cookieObj[pats[0].trim()] = pats[1];
    });
    return cookieObj;
}

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
        if (request.url.indexOf('login') > -1) {
            let header = {
                'Content-Type': 'application/json',
                'Set-Cookie': 'status=1',
            };
            response.writeHead(200, header);
            response.write(JSON.stringify({
                result: 'login success',

            }));
            response.end();
        } else if (request.url.indexOf('del') > -1) {
            let header = {
                'Content-Type': 'application/json',
            };
            let cookie = parseCookie(request);
            //check login 
            if (cookie.status == '1') { 
                //do something
                response.writeHead(200, header);
                response.write(JSON.stringify({
                    result: 'del success',

                }));
                response.end();
            }
        }
    }

}).listen(3001);

console.log('Server running at http://127.0.0.1:3001/');