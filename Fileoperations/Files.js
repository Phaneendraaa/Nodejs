const fs = require("fs");
fs.writeFile("hello.txt","hello world",function error(err){ //writes to a file
    if(err) console.log("error");
    else console.log("done");
});
fs.appendFile("hello.txt","this is appended content",function error(err){ //appends to a file
    if(err) console.log("error"); 
    else console.log("done");
});
fs.rename("hello.txt","renamed.txt",function error(err){ //renames a file
    if(err) console.log("error");
    else console.log("done");
});
fs.copyFile("renamed.txt","copyfile.txt",function error(err){ // copies one file to another using paths
    if(err) console.log("error");
    else console.log("done");
});
fs.rm("./newdir",{recursive:true},function error(err){   // removes directories
    if(err) console.log("error");
    else console.log("done"); 
});
fs.unlink("renamed.txt",function error(err){   // removes files
    if(err) console.log("error");
    else console.log("done"); 
});