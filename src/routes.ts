import { Application } from 'express';
import userRouter from './api/user/router';
import newsRouter from './api/news/router';
export default class Routes {
    
    public static user(_app: Application){
        return _app.use('/user', userRouter);
    }
    
    public static news(_app: Application){
        return _app.use('/news', newsRouter);
    }

}