const express = require('express');
const userList = require('./db/users');
const router = express.Router();

router.get('/:user', (req, res) => {
    debugger;
    const user = userList.filter(x=> x.id === req.url.user);
    if(user) {
        res.json(user);
    } else {
        res.status(404);
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