const http = require("http");
const server = http.createServer(function(req,res){
    res.end("this is a server of http");
})
server.listen(2000);
