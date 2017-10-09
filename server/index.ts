import * as express from 'express';
import config from './config/config';
import { UserController } from './controllers/user-controller';
import * as bodyParser  from 'body-parser';

const app = express();
const router = express.Router();
const userController = new UserController(router);
app.use(router);
app.use(bodyParser.json());


router.get('/api/user', userController.getRoutes());

router.get('/', (req,res)=> {
      res.send('Hello World');
})



app.listen(config.port, ()=> {
      console.log(`Express web server is listening on port : ${config.port}`);
});