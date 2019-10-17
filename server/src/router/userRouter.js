import express from 'express';

const router = express.Router();

router.post('/register',
    (req, res, next) => {
        res.send('Register success!')
    }
);

router.post('/login',
    (req, res, next) => {
        res.send('Login success!')
    }
);

module.exports = router

