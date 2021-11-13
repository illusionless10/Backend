import Service from './service'

export default class Controller {
    
    public static async createNews(req, res): Promise<any> {
        try {
            const result = await Service.createNews(req.body);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    public static async getNews(req, res): Promise<any> {
        try {
            const result = await Service.getNews(req.params);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    public static async getPage(req, res): Promise<any> {
        try {
            const result = await Service.getPage(req.query);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    public static async getNewsByUser(req, res): Promise<any> {
        try {
            const result = await Service.getNewsByUser(req.params);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    public static async updateNews(req, res): Promise<any> {
        try {
            const result = await Service.updateNews(req.body);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    public static async deleteNews(req, res): Promise<any> {
        try {
            const result = await Service.deleteNews(req.body);
            res.status(200).json(result);
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

}