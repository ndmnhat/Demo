const express = require('express');
const app = express();
const AuthRoute = require('./routes/auth');
const TestRoute = require('./routes/test');


app.use('/api/test', TestRoute);
app.use('/api/user',  AuthRoute);

app.listen(3000, () => console.log('Server Up and Running'));