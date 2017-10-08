import * as express from 'express';
import config from './config/config';

const app = express();
const router = express.Router();
app.use(router);

router.get('/', (req,res)=> {
      res.send('Hello World');
})



app.listen(config.port, ()=> {
      console.log(`Express web server is listening on port : ${config.port}`);
});