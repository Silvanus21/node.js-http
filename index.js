const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = "localhost"
const port = 3000

const server = http.createServer((req,res) => {
    console.log(`request for ${req.url} by method ${req.method}`);
    if(req.method == "GET"){
        var fileUrl;
        if(req.url == "/") fileUrl = "/index.html"
        else fileUrl = req.url;
        
        var filepath = path.resolve("./" + fileUrl);
        const fileExt = path.extname(filepath);
        
        if(fileExt == ".html"){
            fs.exists(filepath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader("content-type" ,"text/html");
                    res.end(`<html><body> <h1>Error : 404 ${fileUrl} not found.</h1> </body></html>`);
                }
                else{
                    res.statusCode = 200;
                    res.setHeader("content-type" ,"text/html");
                    fs.createReadStream(filepath).pipe(res);
                }
            });
        }
        else{
            res.statusCode = 404;
             res.setHeader("content-type" ,"text/html");
            res.end(`<html><body> <h1>Error : 404 ${fileUrl} not a html file.</h1> </body></html>`);
        }
    }
    else{
        res.statusCode = 404;
         res.setHeader("content-type" ,"text/html");
        res.end(`<html><body> <h1>Error : 404 ${req.method} not supported.</h1> </body></html>`);
    }
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})