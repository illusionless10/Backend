import { Model, News } from './model';
import { convertSlug, reserveSlug } from '../../shared/slug';

export default class Service {
    
    public static async createNews(payload): Promise<any> {
        return await new Model(<News>payload).save( (err, result) => {
            if (err) throw err;
            return result;
        });
    }

    public static async getNews(payload): Promise<any> {
        payload.title = reserveSlug(payload.title);
        if (!payload) throw 'title is required';
        const result = await Model.find({title: payload.title});
        if (result.length){
            return result;
        }
        return 'title was not found';
    }
    
    public static async getPage(payload): Promise<any> {
        const totalNews = await Model.countDocuments();
        const page = payload.page - 1;
        const itemPerPage = 10;
        const data = await Model.find({})
                    .sort({createdAt: 'desc'})
                    .limit(itemPerPage)
                    .skip(itemPerPage * page)
                    .exec( (err, data) => {
                        if (err) throw err;
                        console.log(data);
                        return data;
                    });
        return {
            totalNews: totalNews,
            data: data
        }
    }

    public static async getNewsByUser(payload): Promise<any> {
        if (!payload.creator) throw 'creator is required';
        return await Model.find({creator: payload.creator}).sort('-createdAt').exec( (err, data) => {
            if (err) throw err;
            return data;
        })
    }

    public static async updateNews(payload): Promise<any> {
        if (!payload.creator_id) throw 'Something went wrong';
        const foundUser = await Model.findById({_id: payload.creator_id}, {_id: 1});
        if (foundUser?._id !== payload.creator_id) throw 'You cannot edit this';
        return await Model.findByIdAndUpdate({_id: payload.id}, payload).exec( (err, data) => {
            if (err) throw err;
            return data;
        });
    }

    public static async deleteNews(payload): Promise<any> {
        if (!payload.creator_id) throw 'Something went wrong';
        const foundUser = await Model.findById({_id: payload.creator_id}, {_id: 1});
        if (foundUser?._id !== payload.creator_id) throw 'You cannot edit this';
        if (!payload._id) throw 'Something went wrong';
        return await Model.findByIdAndDelete({_id: payload.id}).exec( (err, data) => {
            if (err) throw err;
            return data;
        });
    }

}