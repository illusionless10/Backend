import { Types } from 'mongoose';
import { News } from './model';

export default class Middleware {

    public static createNews(req, res, next): void {
        req.body.creator_id = new Types.ObjectId(req.body.decoded._id);
        delete req.body.decoded;
        next();
    }

}