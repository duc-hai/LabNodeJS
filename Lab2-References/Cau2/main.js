const http = require('http');
const url = require('url');
var fs = require('fs');


const host = 'localhost';
const port = 8080;

const email = 'abc@test.com';
const pwd = 'Test@123';

const server = http.createServer((req, res) => {

    const reqURL = url.parse(req.url, true);

    switch (reqURL.pathname) {
        case '/':
            fs.readFile('login.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
            break;
        case '/login':
            const { method } = req;

            console.log(method);

            if(method === 'POST') {
                const chunks = [];
                req.on("data", (chunk) => {
                    console.log('Data updating...', chunk);
                    chunks.push(chunk);
                });
                req.on("end", () => {
                    console.log("all parts/chunks have arrived");
                    
                    const data = Buffer.concat(chunks);
                    console.log('Buffer data', data);
                    
                    const stringData = data.toString();
                    console.log('String data', stringData);

                    const parsedData = new URLSearchParams(stringData);
                    const dataObj = {};
                    for(var pair of parsedData.entries()) {
                        dataObj[pair[0]] = pair[1];
                    }
                    console.log('Data Object', dataObj);

                    //...

                    res.end();
                });


            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(errorPage('Phương thức GET không được hỗ trợ'));
                return res.end();
            }
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(errorPage('Đường dẫn không hợp lệ'));
            return res.end();
    }
});

server.listen(port, host, () => {
    console.log('Server is running');
});

const errorPage = (errorMsg) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
        </head>
        <body>
            <p>${errorMsg}</p>
        </body>
    </html>`;
}