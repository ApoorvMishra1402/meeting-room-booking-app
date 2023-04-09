const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const meetingRoutes = require('./routes/meetings');
const userRoutes = require('./routes/user')


//xpress app
const app = new express();

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/meetings', meetingRoutes);
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("connected to db & server ready at", port);
        });

    })
    .catch((err) => {
        console.log(err);
    });
