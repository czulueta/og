const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", expressJwt({ secret: process.env.SECRET }));

mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/weed",
    { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        console.log("Connected to the database");
    }
);

app.use("/auth", require("./routes/authRouter.js"));
app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use("/api/buying", require("./routes/buying"));

app.use((err, req, res, next) => {
    console.error(err);
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.status(500).send({ message: err.message });
});

app.listen(PORT, () => console.log(`[+] Starting server on port ${PORT}`));

