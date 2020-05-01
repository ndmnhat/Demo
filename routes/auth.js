const router = require('express').Router();
const {Validation} = require('../validation');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


router.post('/register', async (req,res) => {
    
    User.findOne(req.body, (error,result) => {
        if (result) return res.status(400).send('Username is not available');
    });

    const {error} = Validation(req.body);
    if(error) return res.send(error.details[0].message);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    //Luu vao db
    User.create({ 
        username : req.body.username,
        password : hashedPassword
    }, (error,result) => {
        if(error) return res.send(error);

        console.log(result);
        return res.send('Success');
    });
});

router.post('/login', async (req,res) => {

    User.findOne(req.body, async (error, result) => {

        if(!result) return res.status(400).send('Username or password is wrong');
        
        const validPass = await bcrypt.compare(req.body.password,result.Password);
        if(!validPass) return res.status(400).send('Invalid password');
    
        const token = jwt.sign({ _id: result.UserID }, process.env.TOKEN_SECRET, {expiresIn : '10m'});
        res.header('auth-token', token).send(token);
    });

});

module.exports = router;