import { Router } from 'express';
import { auth } from '../../shared/jwt';
import Controller from './controller';
import Middleware from './middleware';

const router = Router();

router.post('/auth/create', auth, Middleware.createNews, Controller.createNews);
router.get('/:title', Controller.getNews);
router.get('', Controller.getPage);
router.get('/:creator', Controller.getNewsByUser);
router.patch('/auth/update', auth, Controller.updateNews);
router.delete('/auth/delete', auth, Controller.deleteNews);


export default router;