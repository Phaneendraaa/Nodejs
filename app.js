let express = require('express'); 
let cookieParser = require('cookie-parser'); 
const jwt = require("jsonwebtoken");
let app = express() 
const bcrypt = require("bcrypt");
app.use(cookieParser()); 
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
        res.cookie("name","naga");
        res.send("cookie set");
}); 
  

//Iterate users data from cookie 
app.get('/getuser', (req, res) => {
        res.send(req.cookies);
        console.log(req.cookies);
});

app.get("/bcrypting",function(req,res){
    let password = "password123";
    
    bcrypt.hash(password, 10 , function(err, hash) {
        
        console.log("encrypted pass is ",hash);
        bcrypt.compare(password, hash).then(function(result) { //immediate decyrption
            console.log(result);
        });
    });
    bcrypt.compare(password,"$2b$10$9nVEe4nmMD29Nu4pdPFEquIIfTJNHfvKYFf7DIRfVZwW2t0MR3xG6").then(function(result) {
        console.log(result);   // original way of decrypting...the hash hastobe saved in db to retreive
    });
   
    res.send("he;l");
})

app.get("/jwt",function(req,res){
    const token = jwt.sign({username:"phani"},"secretkey");
    console.log(token);
    res.cookie("token",token);
    res.send("jwt is set");
})
app.get("/jwtTokenRead",function(req,res){
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "secretkey"); // Use the same secret key used for signing
    console.log("Decoded JWT data:", decoded); // Log the decoded data
    res.send(decoded);
})
//server listens to port 3000 
app.listen(3000, (err)=>{ 
if(err) 
throw err; 
console.log('listening on port 3000'); 
}); 