const express = require('express');
const userList = require('../db/users');
const lo = require('lodash');
const router = express.Router();

router.get('/:user', (req, res) => {
    const userId = req.url.replace('/','');
    
    const user = lo.head(userList.filter(x=> x.id === userId));
    if(user) {
        res.json(user);
    } else {
        res.json({ status : 'user not found'});
    }
});

router.get('/',(req,res)=> {
    res.json([{
        userId : '12345',
        name : 'Simple Test'
    },{
        userId : '12345',
        name : 'Simple Test'
    }]);
    
});



module.exports = router;