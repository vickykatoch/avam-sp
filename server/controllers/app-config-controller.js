const express = require('express');
const path = require('path');
const fs = require('fs');
const yamlFileFolder = path.join(__dirname,'../appConfigs/');

const router = express.Router();

router.get('/:region/:env',(req,res) => {
      const fileName = path.join(yamlFileFolder,`avam-${req.params.region}-${req.params.env}.yaml`);
      res.setHeader('Content-Type', 'text/html');
      // const readableStream = fs.createReadStream(fileName);
      fs.createReadStream(fileName).pipe(res);
});


module.exports = router;
