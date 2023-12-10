var HTTP = require('http');
var URL = require('url');

const hostname = 'localhost';
const port = 8080;

var server = HTTP.createServer((req, res) => {
    const parsedURL = URL.parse(req.url);
    const pathname = parsedURL.pathname;
    const parts = pathname.split('/');
    const method = req.method;

    if(parts[1] == 'students') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        if(parts.length == 2) {
            
            if(method === 'GET') {
                // Get list of students
            }
            else if (method === 'POST') {
                // Create student
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
                    const dataObj = JSON.parse(stringData);
                    console.log(dataObj);
                    //...

                    res.end();
                });
            }
        }
        else {
            const studentId = parts[2];
            switch(method) {
                case 'GET':
                    break;
                case 'DELETE':
                    break;
                case 'PUT':
                    break;
            }
        }
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.write(JSON.stringify({
            errorCode: 404,
            msg: 'Url not found'
        }));
    }

    return res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server is running at ${hostname}:${port}`);
})


const createStudent = () => {

}

const getStudents = () => {

}

const getStudent = (studentId) => {

}

const updateStudent = (studentId, newInfo) => {

}

const deleteStudent = (studentId) => {

}