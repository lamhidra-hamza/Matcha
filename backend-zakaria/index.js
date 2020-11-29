const express = require('express');
const app = express();
const authRouter = require('./utils/auth'); //import auth route
const userRouter = require('./api/users/user.route');
const createDbRouter = require('./api/createDB/createdb.route');
var bodyParser = require('body-parser');

//route middlewares

app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/createDB', createDbRouter);

app.listen(3000, () =>
    console.log('server running and listening on 3000 port')
);