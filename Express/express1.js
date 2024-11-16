const express = require("express");
const app = express();

// Middleware to log the URL of each request
app.use(function(req, res, next) {
    console.log(req.url);
    next(); // Pass control to the next middleware/route
});

app.use(express.json());
app.use(express.urlencoded({extended:true})); //these two lines converts json formatted data from front to here converted and readable

// Error-handling middleware
app.use(function(err, req, res, next) {
    console.log(err.message);
    res.send("ERROR LOADING PAGE");
});

// Route handler
app.get("/", function(req, res,next) {
   res.send("helllo")
});

// Start the server
app.listen(2800, () => {
    console.log("Server is running on http://localhost:2800");
});
