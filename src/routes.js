import { Router } from 'express';

import  DevController from './Controllers/DevController';
import  SearchController from './Controllers/SearchController';


const routes = Router();

routes.get('/devs', DevController.index );
routes.post('/devs', DevController.store );

routes.get('/search', SearchController.index);

export default routes;