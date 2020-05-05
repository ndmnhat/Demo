const router = require('express').Router();
const {Validation} = require('../validation');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
    passport.authenticate('local',
    { session : false},
    (error, user) => {
        console.log(error);
        if (error || !user) {
            return res.status(400).send(error);
        }

        const payload = { userid : user.UserID};

        req.login(payload, {session: false}, (error) => {
            if (error) {
              res.status(400).send({ error });
            }
        });
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '10m'});
        res.cookie('jwt',token);
        res.send(user);
    })(req,res);
    // User.findOne(req.body, async (error, result) => {

    //     if(!result) return res.status(400).send('Username or password is wrong');
        
    //     const validPass = await bcrypt.compare(req.body.password,result.Password);
    //     if(!validPass) return res.status(400).send('Invalid password');
    
    //     const token = jwt.sign({ _id: result.UserID }, process.env.TOKEN_SECRET, {expiresIn : '10m'});
    //     res.header('auth-token', token).send(token);
    // });
});

router.post('/logout', (req,res) => {
    res.cookie('jwt', '');
    res.sendStatus(200);
})

module.exports = router;